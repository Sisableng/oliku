'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNRouter } from '@/lib/progressbar/useNRouter';
import Dropzone from '@/components/ui/dropzone';
import { convertToBase64 } from '@/utils/convertToBase64';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Info } from 'lucide-react';
import { HoverCardArrow } from '@radix-ui/react-hover-card';
import DatePicker from '@/components/ui/date-picker';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { removeImage, uploadImages } from '@/helper/cloudinaryHelper';
import { List } from '@prisma/client';
import { createList, updateList } from '@/app/(me)/me/lists/actions';
import React from 'react';
import { useParams } from 'next/navigation';

interface ListFormProps {
  data?: List | null;
}

const formSchema = z.object({
  vehicle: z.string({
    message: 'Jenis kendaraan dibutuhkan, Mobil atau Motor?',
  }),
  vehicleName: z
    .string({
      required_error: 'Nama kendaraan dibutuhkan.',
    })
    .min(10, {
      message: 'Nama kendaraan dibutuhkan.',
    }),
  maxKm: z.number().min(500, {
    message: 'Maksimal Kilometer setidaknya 500km',
  }),
  lastKm: z.number().min(1000, {
    message: 'Kilometer terakhir setidaknya minimal 1000km',
  }),
  oilCount: z.number().min(1, {
    message: 'Jumlah Oli setidaknya 1',
  }),
  oilType: z
    .string({
      required_error: 'Tipe Oli dibutuhkan.',
    })
    .min(10, {
      message: 'Tipe Oli dibutuhkan.',
    }),
  lastTime: z.date({
    message: 'Ngasal aja dulu kalo gak inget.',
  }),
  cover: z.nullable(z.string()),
  coverId: z.nullable(z.string()),
});

export default function ListForm({ data }: ListFormProps) {
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const router = useNRouter();
  const params = useParams();
  const { data: session } = useSession();

  const getData = React.useCallback(async () => {
    const get = data;
    console.log(get);

    if (get) {
      setSelectedImage(get.cover);

      return {
        vehicle: get.vehicle,
        vehicleName: get.vehicleName,
        maxKm: get.maxKm,
        lastKm: get.lastKm,
        oilCount: get.oilCount,
        oilType: get.oilType,
        lastTime: new Date(get.lastTime),
        cover: get.cover,
        coverId: get.coverId,
      };
    }

    // Ensure a value is returned in all cases
    return {
      vehicle: '',
      vehicleName: '',
      maxKm: 0,
      lastKm: 0,
      oilCount: 1,
      oilType: '',
      lastTime: new Date(),
      cover: null,
      coverId: null,
    };
  }, [data]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => await getData(),
  });

  const { isSubmitting } = form.formState;
  const watchCover = form.watch('cover');
  const watchCoverId = form.watch('coverId');

  const handleCreate = async (
    values: z.infer<typeof formSchema>,
    toastId: string | number
  ) => {
    const formValues = {
      ...values,
      userId: String(session?.user?.id),
    };

    if (selectedImage) {
      toast.loading('Mengupload gambar...', {
        id: toastId,
      });
      const image = await uploadImages(Array(selectedImage), 'List');

      formValues.cover = image[0].url;
      formValues.coverId = image[0].id;
    }

    const req = await createList({
      ...formValues,
      vehicle: formValues.vehicle === 'CAR' ? 'CAR' : 'MOTORCYCLE',
    });

    if (req) {
      toast.success('Berhasil dibuat.', {
        id: toastId,
      });

      router.push('/me');
    } else {
      toast.error('Sepertinya ada yang salah.', {
        id: toastId,
      });
    }
  };

  const handleUpdate = async (
    values: z.infer<typeof formSchema>,
    toastId: string | number
  ) => {
    const formValues = {
      ...values,
      userId: String(session?.user?.id),
    };

    if (selectedImage !== watchCover) {
      if (watchCoverId) {
        toast.loading('Mengupload gambar...', {
          id: toastId,
        });
        const image = await uploadImages(Array(selectedImage), 'List');

        if (image) {
          if (watchCoverId.toLowerCase().includes('list')) {
            await removeImage(String(watchCoverId));
          }
          formValues.cover = image[0].url;
          formValues.coverId = image[0].id;
        }
      } else {
        formValues.cover = selectedImage;
      }
    }

    const req = await updateList({
      where: {
        id: String(params.id),
      },
      data: {
        ...formValues,
        vehicle: formValues.vehicle === 'CAR' ? 'CAR' : 'MOTORCYCLE',
      },
    });

    if (req) {
      toast.success('Berhasil disimpan.', {
        id: toastId,
      });

      router.push('/me');
    } else {
      toast.error('Sepertinya ada yang salah.', {
        id: toastId,
      });
    }
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(data ? 'Menyimpan...' : 'Membuat...');
    try {
      if (!data) {
        await handleCreate(values, toastId);
      } else {
        await handleUpdate(values, toastId);
      }
    } catch (error) {
      console.log(error);
      toast.error('Sepertinya ada masalah internal.', {
        id: toastId,
      });
    }
  }

  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      convertToBase64(file, (base64) => {
        setSelectedImage(base64);
      });
    });
  };

  const handleImageUrl = (url: string) => {
    setSelectedImage(url);
    setImageUrl('');
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
          className='space-y-20'
        >
          <FormSection
            title='1. Info Kendaraan'
            description='Berisi informasi kendaraan kamu, seperti: Jenis kendaraan, Nama kendaraan, Gambar kendaraan, ini sangat penting agar kita cepat mengetahui kendaraan pada list yang kita buat.'
          >
            <FormField
              control={form.control}
              name='vehicle'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Jenis Kendaraan</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih Jenis Kendaraan' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='CAR'>Mobil</SelectItem>
                          <SelectItem value='MOTORCYCLE'>Motor</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='vehicleName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kendaraan</FormLabel>
                  <FormControl>
                    <Input placeholder='Misal: Honda Sonic 150R' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-2'>
              <Label className='flex items-center gap-4'>
                <span>Gambar</span>
                <Badge variant='secondary'>Opsional</Badge>
              </Label>
              <div className='relative overflow-hidden rounded-xl'>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleDrop(acceptedFiles);
                  }}
                  className='relative z-10 h-36'
                  acceptedFileTypes={{
                    'image/*': ['.jpeg', '.png'],
                  }}
                  maxFileSize={1048576}
                  maxFiles={1}
                  // onReset={() => setSelectedFrontImages(null)}
                />
                <div className='absolute inset-0 opacity-50'>
                  {selectedImage && (
                    <img
                      src={`${typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}`}
                      //  key={index}
                      className='h-full w-full object-contain'
                    />
                  )}
                </div>
              </div>

              <div className='flex items-center gap-4 pt-2'>
                <Input
                  aria-label='image-url'
                  type='text'
                  placeholder='URL Gambar (Opsional)'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button
                  type='button'
                  size={'icon'}
                  variant={'secondary'}
                  onClick={() => handleImageUrl(imageUrl)}
                  disabled={imageUrl.length === 0}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </FormSection>

          <FormSection
            title='2. Info Servis'
            description='Informasi untuk Jumlah oli, Jenis oli, Maksimal Kilometer dan terakhir kali kamu ganti oli.'
          >
            <div className='gri-cols-1 grid gap-8 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='oilCount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Oli</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        placeholder='1'
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='oilType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merek Oli</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Misal: Shell Advance AX7'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='maxKm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometer Maksimal</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-4'>
                      <Input
                        type='number'
                        placeholder='Misal: Honda Sonic 150R'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <p className='text-muted-foreground'>Km</p>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Jumlah maksimal kilometer untuk kendaraan tertentu
                    berdasarkan penggunaan dan kebiasaan kamu, untuk kendaraan
                    roda dua biasanya setiap 2000km.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastKm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometer Terakhir</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-4'>
                      <Input
                        type='number'
                        placeholder='Misal: Honda Sonic 150R'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <p className='text-muted-foreground'>Km</p>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Jumlah kilometer saat terakhir kali kamu ganti oli.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kapan terakhir kali ganti oli?</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>
          <div className='flex justify-end'>
            <Button type='submit' size={'lg'} disabled={isSubmitting}>
              {data
                ? isSubmitting
                  ? 'Menyimpan...'
                  : 'Simpan'
                : isSubmitting
                  ? 'Membuat...'
                  : 'Buat'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <section className='grid grid-cols-1 gap-10 md:grid-cols-2'>
      <div className='flex h-max items-center gap-4'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <HoverCard openDelay={300}>
          <HoverCardTrigger>
            <span className='text-primary'>
              <Info size={16} />
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className='text-sm'>{description}</p>
            <HoverCardArrow className='fill-border' />
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className='space-y-8'>{children}</div>
    </section>
  );
};

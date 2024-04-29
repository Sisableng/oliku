'use client';
import { User } from '@prisma/client';
import React from 'react';

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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { convertToBase64 } from '@/utils/convertToBase64';
import { useNRouter } from '@/lib/progressbar/useNRouter';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Dropzone from '@/components/ui/dropzone';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSession } from 'next-auth/react';
import { removeImage, uploadImages } from '@/helper/cloudinaryHelper';
import { updateProfile } from '@/app/(me)/me/profile/actions';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  image: z.string(),
  imageId: z.string(),
});

interface ProfileFormProps {
  data: User;
}

const ProfileForm = ({ data }: ProfileFormProps) => {
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const router = useNRouter();
  const { update } = useSession();

  const getData = React.useCallback(async () => {
    const get = data;

    if (get) {
      return {
        name: String(data.name ?? ''),
        username: data.username,
        email: data.email,
        image: String(data.image ?? ''),
        imageId: String(data.image ?? ''),
      };
    }

    return { name: '', username: '', email: '', image: '', imageId: '' };
  }, [data]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => await getData(),
  });

  const { isSubmitting } = form.formState;
  const watchImage = form.watch('image');
  const watchImageId = form.watch('imageId');

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Menyimpan...');
    try {
      const formValues = {
        ...values,
      };

      if (selectedImage && selectedImage !== watchImage) {
        if (watchImageId) {
          toast.loading('Mengupload gambar...', {
            id: toastId,
          });

          const image = await uploadImages(Array(selectedImage), 'Profile');
          if (image) {
            if (watchImageId.toLowerCase().includes('profile')) {
              await removeImage(String(watchImageId));
            }
            formValues.image = image[0].url;
            formValues.imageId = image[0].id;
          }
        } else {
          formValues.image = selectedImage;
        }
      }

      const req = await updateProfile({
        where: {
          id: data.id,
        },
        data: formValues,
      });

      if (req) {
        await update({
          name: req.name,
          username: req.username,
          email: req.email,
          image: req.image,
        });

        toast.success('Profil berhasil diupdate.', {
          id: toastId,
        });
        console.log(values);
      } else {
        toast.error('Sepertinya ada yang salah.', {
          id: toastId,
        });
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

  React.useEffect(() => {
    if (data) {
      setSelectedImage(data.image);
    }
  }, [data]);
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-10 lg:grid-cols-3'
        >
          <div>
            <div className='space-y-4'>
              <div className='mx-auto h-48 w-48 overflow-hidden rounded-full'>
                <Image
                  src={
                    selectedImage
                      ? typeof selectedImage === 'string'
                        ? selectedImage
                        : URL.createObjectURL(selectedImage)
                      : 'https://github.com/shadcn.png'
                  }
                  width={500}
                  height={500}
                  alt='profile image'
                  className='h-full w-full object-cover'
                />
              </div>

              <div className='flex justify-center'>
                <Button
                  type='button'
                  variant={'secondary'}
                  onClick={() => setIsOpen(true)}
                  className='rounded-l-full rounded-r-full'
                >
                  Upload Gambar
                </Button>
              </div>
            </div>
          </div>
          <div className='space-y-10 lg:col-span-2'>
            <h1 className='text-2xl font-bold lg:text-4xl'>Profil Kamu</h1>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='mail@mail.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-end'>
              <Button
                type='submit'
                size={'lg'}
                className='rounded-l-full rounded-r-full'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Gambar</DialogTitle>
          </DialogHeader>

          <div className='space-y-2'>
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
          <DialogFooter>
            <Button
              type='button'
              onClick={() => {
                setSelectedImage(null);
                setIsOpen(false);
              }}
              variant={'secondary'}
            >
              Batal
            </Button>
            <Button type='button' onClick={() => setIsOpen(false)}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileForm;

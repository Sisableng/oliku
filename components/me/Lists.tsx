'use client';

import { List } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import dynamic from 'next/dynamic';
import { Input } from '../ui/input';
import DatePicker from '../ui/date-picker';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { updateList, deleteLists } from '@/app/(me)/me/lists/actions';
import { useRouter } from 'next/navigation';
import LoadingCard from './card/LoadingCard';

const ListCard = dynamic(() => import('@/components/me/card/ListCard'), {
  ssr: false,
  loading: () => <LoadingCard />,
});

const formSchema = z.object({
  lastKm: z.number().min(1000, {
    message: 'Kilometer terakhir setidaknya minimal 1000km',
  }),
  lastTime: z.date({
    message: 'Ngasal aja dulu kalo gak inget.',
  }),
});

interface ListsProps {
  data: List[] | undefined;
}

export default function Lists({ data }: ListsProps) {
  const [modal, setModal] = useState<'UPDATE' | 'DELETE' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastKm: 0,
      lastTime: new Date(),
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const toastId = toast.loading('Mengupdate...');
      try {
        if (selectedId) {
          const req = await updateList({
            where: {
              id: selectedId,
            },
            data: {
              lastKm: values.lastKm,
              lastTime: values.lastTime,
            },
          });

          if (req) {
            toast.success('Berhasil diupdate', {
              id: toastId,
            });
            setModal(null);
            setSelectedId(null);
            router.refresh();
          }
        } else {
          toast.error(selectedId, {
            id: toastId,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('Sepertinya ada yang salah', {
          id: toastId,
        });
      }
    },
    [selectedId]
  );

  async function handleDelete(ids: string[]) {
    const toastId = toast.loading('Menghapus...');
    try {
      const req = await deleteLists(ids);
      if (req) {
        toast.success('Berhasil dihapus', {
          id: toastId,
        });

        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error('Sepertinya ada masalah internal', {
        id: toastId,
      });
    }
  }

  useEffect(() => {
    if (data && selectedId) {
      const val = data.find((item) => item.id === selectedId);

      if (val) {
        form.setValue('lastKm', val.lastKm);
        form.setValue('lastTime', new Date(val.lastTime));
      }

      return () => {
        form.reset();
        setSelectedId(null);
      };
    }
  }, [data, selectedId, form]);

  return (
    <>
      <div className='space-y-6'>
        {data && data.length > 0 ? (
          data.map((list) => {
            return (
              <ListCard
                key={list.id}
                data={list}
                onUpdate={(id) => {
                  setSelectedId(id);
                  setModal('UPDATE');
                }}
                onDelete={(id) => {
                  setSelectedId(id);
                  setModal('DELETE');
                }}
              />
            );
          })
        ) : (
          <div>
            <p>Tidak ada lists yang ditemukan</p>
          </div>
        )}
      </div>

      <Dialog
        open={modal === 'UPDATE'}
        onOpenChange={(open) => setModal(open ? 'UPDATE' : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Item</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                        className='w-full bg-transparent'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button asChild type='button' variant={'ghost'}>
                <Link
                  href={`/me/lists/update/${selectedId}`}
                  className='flex items-center gap-2'
                >
                  <span>Update detail</span>
                  <ChevronRight size={16} />
                </Link>
              </Button>

              <DialogFooter>
                <Button
                  type='button'
                  variant={'secondary'}
                  onClick={() => setModal(null)}
                >
                  Batal
                </Button>
                <Button>Simpan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={modal === 'DELETE'}
        onOpenChange={(open) => setModal(open ? 'DELETE' : null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kamu yakin mau hapus ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus list ini
              secara permanen dari server kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedId && handleDelete(Array(selectedId))}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

'use client';
import { redirect, useParams } from 'next/navigation';
import React from 'react';
import { useSession } from 'next-auth/react';

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
import { toast } from 'sonner';
import { updateName } from './actions';
import { useNRouter } from '@/lib/progressbar/useNRouter';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama setidaknya memiliki 2 karakter.',
  }),
});

export default function WhoPage() {
  const params = useParams<{ id: string }>();
  const router = useNRouter();
  const { data: session, update } = useSession();

  if (session?.user?.name) {
    return redirect('/me');
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Menyimpan...');
    try {
      const req = await updateName(values.name, params.id);

      if (req) {
        toast.success('Nama mu berhasil disimpan', {
          id: toastId,
        });
        await update({ name: values.name });
        router.push('/me');
      }
    } catch (error) {
      console.log(error);
      toast.error('Sepertinya ada masalah internal', {
        id: toastId,
      });
    }
  }
  return (
    <div className='space-y-20'>
      <section className='space-y-10'>
        <h1 className='text-4xl font-bold'>Kenalan dulu yuk!</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl font-semibold'>
                      Siapa Nama kamu?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Tulis Nama mu disini...'
                        className='max-w-lg'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Tak kenal maka tak kenal.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </form>
          </Form>
        </div>
      </section>
      <section></section>
    </div>
  );
}

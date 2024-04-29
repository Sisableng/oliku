'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { useNRouter } from '@/lib/progressbar/useNRouter';

import { useSearchParams } from 'next/navigation';
import { signInServer } from '@/app/(main)/auth/actions';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const passwordSchema = z
  .string()
  .min(8, 'Kata sandi harus terdiri dari minimal 8 karakter')
  .regex(
    /(?=.*?[A-Z])/,
    'Kata sandi harus mengandung setidaknya satu huruf besar'
  )
  .regex(
    /(?=.*?[a-z])/,
    'Kata sandi harus mengandung setidaknya satu huruf kecil'
  )
  .regex(
    /(?=.*?[0-9])/,
    'Kata sandi harus mengandung setidaknya satu digit angka'
  )
  .regex(
    /(?=.*?[#?!@$%^&*-])/,
    'Kata sandi harus mengandung setidaknya satu karakter khusus'
  );

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .regex(/(?=.*?[a-z0-9_-]{3,15}$)/, 'Username tidak benar'),
  password: passwordSchema,
});

export default function FormSignin() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useNRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Memproses...');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl,
      });

      console.log(res);
      if (!res?.error) {
        toast.success('Selamat Datang!', {
          id: toastId,
        });
        router.push('/me');
      } else {
        switch (res.error) {
          case 'Invalid Password':
            form.setError('password', {
              message: 'Password Salah',
            });
            toast.warning('Password Salah', {
              id: toastId,
            });
            break;
          case 'User not found':
            form.setError('username', {
              message: 'User tidak ditemukan',
            });
            toast.error('User tidak ditemukan', {
              id: toastId,
            });
            break;

          default:
            toast.error('Sepertinya ada yang salah, silahkan coba lagi.', {
              id: toastId,
            });
            break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi masalah internal, silahkan coba lagi.', {
        id: toastId,
      });
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const forceHardPush = () => {
    const { protocol, host } = window.location;
    window.location.href = `${protocol}//${host}/me`;
  };

  return (
    <div>
      {session ? (
        <div className='space-y-2 text-center'>
          <h3>Kamu akan segera dialihkan.</h3>
          <Button
            variant={'link'}
            onClick={forceHardPush}
            className='text-primary underline'
          >
            Klik disini jika terlalu lama
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        autoComplete='off'
                        {...field}
                      />
                      <Button
                        type='button'
                        size={'icon'}
                        variant={showPassword ? 'default' : 'secondary'}
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Masuk
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

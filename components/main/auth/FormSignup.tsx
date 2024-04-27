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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { saltAndHashPassword } from '@/utils/password';
import { Progress } from '@/components/ui/progress';
import clsx from 'clsx';

import { useNRouter } from '@/lib/progressbar/useNRouter';
import { signIn } from '@/auth';
import { signUp } from '@/app/(main)/auth/actions';
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
  email: z.string().email({
    message: 'Email tidak benar',
  }),
  password: passwordSchema,
});

export default function FormSignup() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkTerms, setCheckTerms] = useState<boolean>(false);

  const router = useNRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const watchPassword = form.watch('password');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!checkTerms) {
      toast.warning('Kamu belum menyetujui kebijakan pengguna!');
    } else {
      const toastId = toast.loading('Memproses...');
      try {
        const formData: z.infer<typeof formSchema> = {
          ...values,
          password: saltAndHashPassword(values.password),
        };

        if (typeof formData.password === 'undefined') {
          toast.error('Sepertinya terjadi masalah, silahkan coba lagi.', {
            id: toastId,
          });
        } else if (typeof formData.password === 'string') {
          const user = await signUp(formData);

          if (user) {
            toast.loading('Mengalihkan halaman...', {
              id: toastId,
            });

            const res = await signIn('credentials', {
              redirect: false,
              username: user.username,
              password: user.password,
            });

            if (!res?.error) {
              router.push(`/me/who/${user.id}`);
            }
          } else {
            toast.error('Sepertinya ada yang salah, silahkan coba lagi.', {
              id: toastId,
            });
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Terjadi masalah internal, silahkan coba lagi.', {
          id: toastId,
        });
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Implement your password strength calculation logic here
    // You can use a library like zxcvbn for a more accurate strength calculation
    const calculateStrength = () => {
      // Example: Calculate strength by checking each regex condition
      const regexConditions = [
        /(?=.*?[A-Z])/,
        /(?=.*?[a-z])/,
        /(?=.*?\d)/,
        /(?=.*?[#?!@$%^&*-])/,
      ];

      let fulfilledCount = 0;

      regexConditions.forEach((regex) => {
        if (regex.test(watchPassword)) {
          fulfilledCount++;
        }
      });

      const totalConditions = regexConditions.length;

      const strengthPercentage = (fulfilledCount / totalConditions) * 100;
      setPasswordStrength(strengthPercentage);
    };

    if (watchPassword) {
      calculateStrength();
    } else {
      setPasswordStrength(0);
    }
  }, [watchPassword]);

  return (
    <div>
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='mail@mail.com' {...field} />
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
                <FormLabel>
                  <div className='flex items-center gap-6'>
                    <span>Password</span>
                    {passwordStrength > 0 && (
                      <div className='flex-1'>
                        <Progress
                          value={passwordStrength}
                          className='h-1'
                          indicatorClass={clsx(
                            passwordStrength < 60 && 'bg-destructive',
                            passwordStrength >= 60 &&
                              passwordStrength < 80 &&
                              'bg-primary',
                            passwordStrength >= 80 && 'bg-emerald-500'
                          )}
                        />
                      </div>
                    )}
                    <div className='w-12 text-right'>
                      {watchPassword.length > 0 && passwordStrength < 60 && (
                        <p className='text-xs font-semibold text-destructive'>
                          Payah
                        </p>
                      )}
                      {passwordStrength >= 60 && passwordStrength < 80 && (
                        <p className='text-xs font-semibold text-primary'>
                          Hampir
                        </p>
                      )}
                      {passwordStrength >= 80 && (
                        <p className='text-xs font-semibold text-green-600'>
                          Bagus!
                        </p>
                      )}
                    </div>
                  </div>
                </FormLabel>
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
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              onCheckedChange={(val: boolean) => setCheckTerms(val)}
            />
            <Label htmlFor='terms'>Saya menyetujui kebijakan pengguna.</Label>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            Buat Akun
          </Button>

          <div className='text-center text-sm'>
            <p>
              Sudah punya akun?{' '}
              <Link href='/auth/signin' className='text-primary underline'>
                Masuk
              </Link>{' '}
              sekarang.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

'use client';
import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react';

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
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { updateProfile } from '@/app/(me)/me/profile/actions';
import { compareHashPassword, saltAndHashPassword } from '@/utils/password';
import { useNRouter } from '@/lib/progressbar/useNRouter';

interface PasswordFormProps {
  data: User;
}

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/(?=.*?[A-Z])/, 'Password must contain at least one uppercase letter')
  .regex(/(?=.*?[a-z])/, 'Password must contain at least one lowercase letter')
  .regex(/(?=.*?[0-9])/, 'Password must contain at least one digit of number')
  .regex(
    /(?=.*?[#?!@$%^&*-])/,
    'Password must contain at least one special character'
  );

const formSchema = z
  .object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirm: z.string(),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirm;
    },
    {
      message: 'Password tidak sama!',
      path: ['confirm'],
    }
  );

const PasswordForm = ({ data }: PasswordFormProps) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useNRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirm: '',
    },
  });

  const { isSubmitting } = form.formState;
  const watchNewPassword = form.watch('newPassword');

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Mengecek password...');
    try {
      const checkPassword = compareHashPassword(values.password, data.password);

      if (checkPassword) {
        const req = await updateProfile({
          where: {
            id: data.id,
          },
          data: {
            password: saltAndHashPassword(values.newPassword),
          },
        });

        if (req) {
          toast.success('Password berhasil diubah', {
            id: toastId,
          });

          router.push('/me/profile');
        }
      } else {
        toast.warning('Password salah!', {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Sepertinya ada yang salah', {
        id: toastId,
      });
    }
  }

  const toggleShowPassword = (val: boolean) => {
    setShowPassword(val);
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
        if (regex.test(watchNewPassword)) {
          fulfilledCount++;
        }
      });

      const totalConditions = regexConditions.length;

      const strengthPercentage = (fulfilledCount / totalConditions) * 100;
      setPasswordStrength(strengthPercentage);
    };

    if (watchNewPassword) {
      calculateStrength();
    } else {
      setPasswordStrength(0);
    }
  }, [watchNewPassword]);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <h1 className='text-2xl font-bold lg:text-4xl'>Password</h1>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password lama'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password baru</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password baru'
                        autoComplete='off'
                        className='pr-12'
                        {...field}
                      />
                      <div className='absolute right-2.5 top-2.5'>
                        {watchNewPassword.length > 0 &&
                          passwordStrength < 60 && (
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Konfirmasi Password'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' onCheckedChange={toggleShowPassword} />
              <Label htmlFor='terms'>{`${showPassword ? 'Tutup' : 'Lihat'} Password`}</Label>
            </div>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;

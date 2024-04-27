'use server';
import prisma from '@/lib/prisma';
import { signIn } from '@/auth';

interface Values {
  username: string;
  password: string;
}

export const signInServer = async (values: Values, callbackUrl: string) => {
  const res = await signIn('credentials', {
    redirect: false,
    username: values.username,
    password: values.password,
    callbackUrl,
  });

  return res;
};

export const signUp = async (formData: any) => {
  const user = await prisma.user.create({
    data: {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    },
  });

  return user;
};

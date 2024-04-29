'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateProfile = async (option: Prisma.UserUpdateArgs) => {
  try {
    const data = await prisma.user.update(option);

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/me/profile');
  }
};

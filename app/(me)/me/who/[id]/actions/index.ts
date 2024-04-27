'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateName = async (name: string, userId: string) => {
  try {
    const req = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });

    return req;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/me');
  }
};

'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createList = async (values: FormValues) => {
  try {
    const data = await prisma.list.create({
      data: values,
    });

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/me');
  }
};

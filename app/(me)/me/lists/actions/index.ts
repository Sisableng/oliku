'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getList = async (id: string) => {
  try {
    const data = await prisma.list.findUnique({
      where: {
        id: id,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

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

export const updateList = async (option: Prisma.ListUpdateArgs) => {
  try {
    const data = await prisma.list.update(option);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/me');
  }
};

export const deleteLists = async (ids: string[]) => {
  try {
    const data = await prisma.list.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/me');
  }
};

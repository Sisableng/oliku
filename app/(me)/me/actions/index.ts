'use server';

import prisma from '@/lib/prisma';

export const getLists = async (userId: string) => {
  try {
    const data = await prisma.list.findMany({
      where: {
        userId: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

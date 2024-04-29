'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getUserSession = async () => {
  const session = await auth();

  return session;
};

export const getUserData = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

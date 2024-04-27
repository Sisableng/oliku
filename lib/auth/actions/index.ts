import prisma from '@/lib/prisma';

export const getUserFromDb = async (username: string | unknown) => {
  if (typeof username === 'string') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  return undefined;
};

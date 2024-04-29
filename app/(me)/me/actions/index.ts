'use server';

import prisma from '@/lib/prisma';
import { List } from '@prisma/client';

export const getLists = async (
  userId: string,
  filter?: string,
  query?: string
) => {
  try {
    let data: List[] = [];
    if (filter) {
      if (query) {
        const req = await prisma.list.findMany({
          where: {
            userId: userId,
            vehicle: filter === 'car' ? 'CAR' : 'MOTORCYCLE',
            vehicleName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        data = req;
      } else {
        const req = await prisma.list.findMany({
          where: {
            userId: userId,
            vehicle: filter === 'car' ? 'CAR' : 'MOTORCYCLE',
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        data = req;
      }
    } else if (query) {
      const req = await prisma.list.findMany({
        where: {
          userId: userId,
          vehicleName: {
            contains: query,
            mode: 'insensitive',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      data = req;
    } else {
      const req = await prisma.list.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      data = req;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

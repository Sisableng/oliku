'use server';

import { auth } from '@/auth';

export const getUserSession = async () => {
  const session = await auth();

  return session;
};

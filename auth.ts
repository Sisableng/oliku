import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import 'next-auth/jwt';
import prisma from './lib/prisma';
import type { Adapter } from 'next-auth/adapters';
import authConfig from './auth.config';

declare module 'next-auth/jwt' {
  interface JWT {
    image: string | null | undefined;
    username: string;
  }
}

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});

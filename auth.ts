import NextAuth, { User, type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compareHashPassword } from '@/utils/password';
import { getUserFromDb } from './lib/auth/actions';
import 'next-auth/jwt';
import prisma from './lib/prisma';
import type { Adapter } from 'next-auth/adapters';

declare module 'next-auth' {
  interface User {
    username: string;
  }
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'epull' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (
          typeof credentials.username !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          throw new Error('Invalid username or password');
        }

        let user = null;

        // logic to verify if user exists
        user = await getUserFromDb(credentials.username);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        const isCorrectPassword = compareHashPassword(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Password');
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }

      if (user) {
        // Assuming `user.id` is always a string.
        token.id = user.id as string;
        return {
          ...token,
          username: user.username,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Asserting `token.id` is a string based on the previous callback.
      session.user.id = token.id as string;
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          username: token.username,
        },
      };
    },
  },
});

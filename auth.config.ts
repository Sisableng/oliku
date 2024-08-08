import type { NextAuthConfig, DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compareHashPassword } from '@/utils/password';
import { getUserFromDb } from './lib/auth/actions';
import { ZodError } from 'zod';
import signInSchema from './lib/auth/zod/signInSchema';

declare module 'next-auth' {
  interface User {
    //   id: string;
    //   name: string | null;
    //   email: string;
    username: string;
    //   image: string | null;
  }
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }
}

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'epull' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { username, password } =
            await signInSchema.parseAsync(credentials);

          // logic to verify if user exists
          user = await getUserFromDb(username);

          if (!user) {
            throw new Error('User not found.');
          }

          const isCorrectPassword = compareHashPassword(
            password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid Password');
          }

          // return user object with the their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          // Handle other errors
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session) {
        token.username = session.username;
        token.email = session.email;
        token.name = session.name;
        token.image = session.image;
      }

      if (user) {
        // Assuming `user.id` is always a string.
        token.id = user.id as string;
        return {
          ...token,
          username: user.username,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
      return token;
    },
    session({ session, token }) {
      // Asserting `token.id` is a string based on the previous callback.
      session.user.id = token.id as string;
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          email: token.email,
          name: token.name,
          image: token.image,
        },
      };
    },
  },
} satisfies NextAuthConfig;

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '#',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '#',
    }),
  ],
  jwt: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { id } = user;
        token.userId = id;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return (
          (profile as any)?.email_verified &&
          (profile as any)?.email.endsWith('@etimo.se')
        );
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthOptions;

export function getAuthSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

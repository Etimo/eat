import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const getSessionId = async (identityToken: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${identityToken}`,
  });
  return await fetch(`${process.env.AUTH_URL}/auth/session`, {
    headers,
  }).then(async (response) => await response.json());
};

const getAccessToken = async (sessionId: string) => {
  return await fetch(`${process.env.AUTH_URL}/auth/accessToken`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      sessionId: sessionId,
    }),
  }).then(async (response) => {
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error('Unauthorized');
    }
  });
};

const getCurrentUser = async (accessToken: string, id: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
  });
  return await fetch(`${process.env.BACKEND_URL}/user/${id}`, {
    headers,
  }).then(async (response) => await response.json());
};

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '#',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '#',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          image: profile.picture,
          sessionId: profile.sessionId,
        };
      },
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
    async jwt({ token, account }) {
      if (account && account.id_token) {
        const { sessionId, userId } = await getSessionId(account.id_token);
        if (sessionId && userId) {
          token.userId = userId;
          token.sessionId = sessionId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sessionId) {
        try {
          const { token: accessToken } = await getAccessToken(
            token.sessionId as string,
          );

          if (accessToken) {
            session.accessToken = accessToken;

            const user = await getCurrentUser(accessToken, token.userId);
            if (user) {
              session.user = { ...user };
            }
          }
        } catch (error) {
          throw new Error('Unable to renew access token');
        }
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      if (account?.provider === 'google') {
        const isEtimo =
          profile?.email_verified && profile?.email?.endsWith('@etimo.se');

        if (!isEtimo) {
          return false;
        }
        return true;
      }
      return false;
    },
  },
  secret: process.env.JWT_SECRET,
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

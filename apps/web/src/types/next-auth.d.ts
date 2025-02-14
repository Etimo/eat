import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      picture: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface Profile {
    email_verified?: boolean;
    email?: string;
  }

  interface Account {
    id_token: string;
  }

  interface User {
    sessionId: string;
  }

  // interface User {
  //   sessionId: string;
  // }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    userId: string;
    sessionId: string;
  }
}

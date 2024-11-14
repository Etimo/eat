'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

type ClientSessionProviderProps = {
  children: ReactNode;
  session: Session | null;
};
export const ClientSessionProvider: FC<ClientSessionProviderProps> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
ClientSessionProvider.displayName = 'ClientSessionProvider';

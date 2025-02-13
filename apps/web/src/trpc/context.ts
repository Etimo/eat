import { getAuthSession } from '@/auth';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  const session = await getAuthSession();

  return { token: session?.accessToken ?? '' };
});

export type AppContext = Awaited<ReturnType<typeof createTRPCContext>>;

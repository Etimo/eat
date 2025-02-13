import { getAuthSession } from '@/auth';
import { initTRPC } from '@trpc/server';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  const session = await getAuthSession();

  return { token: session?.accessToken ?? '' };
});

export type AppContext = Awaited<ReturnType<typeof createTRPCContext>>;
export const t = initTRPC.context<AppContext>().create();
export const { router, procedure, createCallerFactory } = t;

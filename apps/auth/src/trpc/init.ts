import { initTRPC } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export async function createAuthContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  const token = req.headers.authorization ?? 'default-token';
  const server = req.server;

  return { token, server };
}
export type AuthContext = Awaited<ReturnType<typeof createAuthContext>>;
export const { router, procedure } = initTRPC.context<AuthContext>().create();

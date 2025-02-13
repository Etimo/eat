import { initTRPC } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { validateToken } from '../utils';
import { initORM } from '../db';

export async function createServerContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  const token = req.headers.authorization ?? 'default-token';

  return { token };
}
export type ServerContext = Awaited<ReturnType<typeof createServerContext>>;
export const { router, procedure } = initTRPC.context<ServerContext>().create();

export const protectedProcedure = procedure.use(async (opts) => {
  const { ctx } = opts;
  const db = await initORM();

  const { currentUserId, currentUserRole } = validateToken(ctx.token);
  const currentUser = await db.users.findOne({ id: currentUserId });

  return opts.next({
    ...opts,
    ctx: {
      ...ctx,
      db,
      currentUserId,
      currentUserRole,
      currentUser,
    },
  });
});

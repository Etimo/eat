import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { validateToken } from '../utils';
import { initORM } from '../db';

export async function createServerContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  return { req, res };
}
export type ServerContext = Awaited<ReturnType<typeof createServerContext>>;
export const { router, procedure, middleware } = initTRPC
  .context<ServerContext>()
  .create();

const isAuthed = middleware(async ({ ctx, next }) => {
  if (!ctx.req.session || !ctx.req.isAuthenticated()) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    });
  }
  const db = await initORM();
  const currentUser = await db.users.findOne({
    email: (ctx.req.user as any).email,
  });

  if (!currentUser) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not found',
    });
  }

  return next({
    ctx: {
      db,
      // Add user and session info to context
      session: ctx.req.session,
      user: ctx.req.user,
      currentUser,
    },
  });
});

export const protectedProcedure = procedure.use(isAuthed);

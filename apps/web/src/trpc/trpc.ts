import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { t } from './init';
import { activitiesRouter } from './routers/activities-router';
import { teamsRouter } from './routers/teams-router';
import { ServerRouter } from 'eat-backend/trpc';
import { AuthRouter } from 'auth/trpc';

export const appRouter = t.router({
  activities: activitiesRouter,
  teams: teamsRouter,
});
export type AppRouter = typeof appRouter;

export const createServerTrpc = (token: string) =>
  createTRPCClient<ServerRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3100/trpc',
        headers() {
          return {
            Authorization: `Bearer ${token}`,
          };
        },
      }),
    ],
  });

export const createAuthTrpc = (token: string) =>
  createTRPCClient<AuthRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3101/trpc',
        headers() {
          return {
            Authorization: token,
          };
        },
      }),
    ],
  });

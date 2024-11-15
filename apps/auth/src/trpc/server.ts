import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { type ServerRouter } from 'eat-backend/trpc';

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

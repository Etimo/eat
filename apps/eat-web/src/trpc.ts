import { createTRPCReact } from '@trpc/react-query';
import type { ServerRouter } from 'eat-backend/trpc';

export const trpc = createTRPCReact<ServerRouter>();

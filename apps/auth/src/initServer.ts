import fastify, { FastifyInstance } from 'fastify';
import { ValidationError } from '#types';
import redis, { FastifyRedis } from '@fastify/redis';
import dotenv from 'dotenv';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { AuthRouter, authRouter } from './trpc/trpc';
import { createAuthContext } from './trpc/init';

// type definitions
declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis;
  }
}

export const initServer = async (host = '0.0.0.0', port = 3101) => {
  dotenv.config();
  const server: FastifyInstance = fastify();

  // Redis
  // const scheme = process.env.NODE_ENV !== 'development' ? 'rediss' : 'redis';
  const scheme = 'redis';
  server.register(redis, {
    url: `${scheme}://default:${process.env.EAT_REDIS_PASSWORD}@${process.env.EAT_REDIS_HOST}:${process.env.EAT_REDIS_PORT}`,
  });

  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: authRouter,
      createContext: createAuthContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AuthRouter>['trpcOptions'],
  });

  // Error handling
  server.setErrorHandler((error, request, reply) => {
    if (error instanceof ValidationError) {
      return reply.status(400).send({ error: error.message });
    }

    if (error instanceof Error) {
      reply.status(500).send({ error: error.message });
    }
  });

  // Start server
  try {
    server.listen({ port, host }, () =>
      console.log(`Listening on port ${port}...`),
    );
  } catch (err) {
    // server.log.error(err);
    process.exit(1);
  }

  return { server };
};

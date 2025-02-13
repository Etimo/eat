import fastify, { FastifyInstance } from 'fastify';
import { usersController } from './controllers';
import { initORM, seedBaseData, seedUsers } from './db';
import { NotFoundError, RequestContext } from '@mikro-orm/core';
import { AuthError, ValidationError } from './types';
import { validateToken } from './utils';
import { User } from './entities';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { ServerRouter, serverRouter } from './trpc/trpc';
import { createServerContext } from './trpc/init';
import fastifyCors from '@fastify/cors';
import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from '@fastify/passport';

declare module 'fastify' {
  export interface FastifyRequest {
    currentUser: User;
  }
}

export const initServer = async (host = '0.0.0.0', port = 3100) => {
  const server: FastifyInstance = fastify({ maxParamLength: 5000 });

  const db = await initORM();

  // Run migrations
  await db.orm.migrator.up();
  if ((await db.users.count()) === 0) {
    await seedBaseData(db);
  } else {
    await seedUsers(db);
  }

  server.register(fastifySecureSession, {
    // The key should be a Buffer of at least 32 bytes
    key: Buffer.from(process.env.SESSION_KEY || 'a'.repeat(32), 'utf8'),
    cookie: {
      path: '/',
      // secure should be true in production
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    },
  });
  server.register(fastifyCors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Hooks
  server.addHook('preParsing', async (request, reply) => {
    try {
      console.log('request', request.session.get('user'));
      // validateToken(request.headers.authorization);
    } catch (e) {
      console.log(e);
      if (e instanceof AuthError) {
        return reply.code(401);
      }
      return reply.code(500);
    }
  });
  server.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done);
  });
  server.addHook('onClose', async () => {
    await db.orm.close();
  });

  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: serverRouter,
      createContext: createServerContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<ServerRouter>['trpcOptions'],
  });

  // Controllers
  server.register(usersController, { prefix: 'user' });

  // Error handling
  server.setErrorHandler((error, request, reply) => {
    if (error instanceof AuthError) {
      return reply.status(401).send({ error: error.message });
    }

    if (error instanceof ValidationError) {
      return reply.status(400).send({ error: error.message });
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
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
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }

  return { server };
};

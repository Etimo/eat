import fastify, { FastifyInstance } from 'fastify';
import {
  activitiesController,
  activityTypesController,
  competitionsController,
  teamsController,
  usersController,
} from './controllers';
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

  // Hooks
  server.addHook('preParsing', async (request, reply) => {
    try {
      validateToken(request.headers.authorization);
    } catch (e) {
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
  // server.register(activitiesController, { prefix: 'activity' });
  // server.register(activityTypesController, { prefix: 'activitytype' });
  // server.register(competitionsController, { prefix: 'competition' });
  // server.register(teamsController, { prefix: 'team' });
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

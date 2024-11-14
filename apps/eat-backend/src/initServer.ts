import Fastify, { FastifyInstance } from 'fastify';
import {
  activitiesController,
  activityTypesController,
  competitionsController,
  teamsController,
  usersController,
} from './controllers';
import { initORM, seedBaseData } from './db';
import { NotFoundError, RequestContext } from '@mikro-orm/core';
import { AuthError, ValidationError } from './types';
import { validateToken } from './utils';
import { User } from './entities';

declare module 'fastify' {
  export interface FastifyRequest {
    currentUser: User;
  }
}

export const initServer = async (host = '0.0.0.0', port = 3100) => {
  const server: FastifyInstance = Fastify();
  const db = await initORM();

  // Run migrations
  await db.orm.migrator.up();
  if ((await db.users.count()) === 0) {
    await seedBaseData(db);
  }

  // Hooks
  server.addHook('preParsing', async (request, reply) => {
    try {
      const { currentUserId } = validateToken(request.headers.authorization);

      if (currentUserId) {
        const currentUser = await db.users.findOneOrFail({
          id: currentUserId,
        });
        request.currentUser = currentUser;
      }
    } catch (e) {
      console.error('preParsing', e);
      return reply.code(500).send('asd asd asd');
    }
  });
  server.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done);
  });
  server.addHook('onClose', async () => {
    await db.orm.close();
  });

  // Controllers
  server.register(activitiesController, { prefix: 'activity' });
  server.register(activityTypesController, { prefix: 'activitytype' });
  server.register(competitionsController, { prefix: 'competition' });
  server.register(teamsController, { prefix: 'team' });
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
    server.log.error(err);
    process.exit(1);
  }

  return { server };
};

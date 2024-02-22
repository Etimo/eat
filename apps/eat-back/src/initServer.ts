import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { activityTypesController } from './controllers';
import { initORM, seedBaseData } from './db';
import { NotFoundError, RequestContext } from '@mikro-orm/core';
import { ValidationError } from './types';

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const initServer = async (
  host = '0.0.0.0',
  port = 3100,
  migrate: boolean,
) => {
  const server: FastifyInstance = Fastify();
  const db = await initORM();

  // Run migrations
  if (migrate) {
    await db.orm.migrator.up();

    await seedBaseData(db);
  }

  // Hooks
  server.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done);
  });
  server.addHook('onClose', async () => {
    await db.orm.close();
  });

  // Routes
  server.get('/ping', opts, async (request, reply) => {
    return { pong: 'it worked!' };
  });

  // Controllers
  server.register(activityTypesController, { prefix: 'activitytype' });

  // Error handling
  server.setErrorHandler((error, request, reply) => {
    console.log(typeof error);
    // if (error instanceof AuthError) {
    //   return reply.status(401).send({ error: error.message });
    // }

    if (error instanceof ValidationError) {
      return reply.status(400).send({ error: error.message });
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    if (error instanceof Error) {
      reply.status(500).send({ error: error.message });
    }
    // reply.status(404).send({ error: error.message });
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

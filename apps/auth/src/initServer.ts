import Fastify, { FastifyInstance } from 'fastify';
import { authController } from '#controllers';
import { ValidationError } from '#types';
import redis, { FastifyRedis } from '@fastify/redis';
import dotenv from 'dotenv';

// type definitions
declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis;
  }
}

export const initServer = async (host = '0.0.0.0', port = 3101) => {
  dotenv.config();
  const server: FastifyInstance = Fastify();

  // Redis
  // const scheme = process.env.NODE_ENV !== 'development' ? 'rediss' : 'redis';
  const scheme = 'redis';
  server.register(redis, {
    url: `${scheme}://default:${process.env.EAT_REDIS_PASSWORD}@${process.env.EAT_REDIS_HOST}:${process.env.EAT_REDIS_PORT}`,
  });

  server.get('/', async (request, reply) => {
    return reply.send('hej');
  });

  // Controllers
  server.register(authController, { prefix: 'auth' });

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

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
import fastifySecureSession from '@fastify/secure-session';
import fastifyCors from '@fastify/cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import fastifyPassport from '@fastify/passport';
import { createNewUser, getUserByEmail, updateUser } from './utils/user';

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

  server.addHook('preParsing', async (request, reply) => {
    console.log('preParsing', request.headers);
  });

  server.register(fastifySecureSession, {
    key: Buffer.from('60397fda-c71c-460f-97b7-c2e31df026db', 'utf-8'),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  });
  server.register(fastifyCors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  // Initialize Passport
  server.register(fastifyPassport.initialize());
  server.register(fastifyPassport.secureSession());

  // Configure Google Strategy
  fastifyPassport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:3101/auth/google/callback',
        scope: ['email', 'profile'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('profile', profile);

          const tokenUser = {
            id: profile.id,
            email: profile.emails?.[0]?.value ?? '',
            name: profile.displayName,

            picture: profile.photos?.[0]?.value ?? '',
          };

          const user =
            (await updateUser(tokenUser)) ?? (await createNewUser(tokenUser));

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  fastifyPassport.registerUserSerializer(
    async (user: { email: string }) => user.email,
  );
  fastifyPassport.registerUserDeserializer(async (email: string) => {
    return getUserByEmail(email);
  });

  // Auth routes
  server.get(
    '/auth/google',
    fastifyPassport.authenticate('google', { scope: ['email', 'profile'] }),
  );

  server.get(
    '/auth/google/callback',
    fastifyPassport.authenticate('google', {
      failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`,
      successRedirect: process.env.FRONTEND_URL || 'http://localhost:3000',
    }),
  );

  server.get('/auth/user', async (request, reply) => {
    if (!request.isAuthenticated()) {
      reply.code(401).send({ error: 'Not authenticated' });
      return;
    }
    reply.send({ user: request.user });
  });

  server.get('/auth/logout', async (request, reply) => {
    request.logout();
    reply.send({ success: true });
  });

  // server.register(fastifyTRPCPlugin, {
  //   prefix: '/trpc',
  //   trpcOptions: {
  //     router: authRouter,
  //     createContext: createAuthContext,
  //     onError({ path, error }) {
  //       // report to error monitoring
  //       console.error(`Error in tRPC handler on path '${path}':`, error);
  //     },
  //   } satisfies FastifyTRPCPluginOptions<AuthRouter>['trpcOptions'],
  // });

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

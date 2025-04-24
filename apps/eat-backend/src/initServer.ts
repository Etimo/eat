import fastify, { FastifyInstance } from 'fastify';
import { usersController } from './controllers';
import { initORM, seedBaseData, seedUsers } from './db';
import { NotFoundError, RequestContext } from '@mikro-orm/core';
import { AuthError, ValidationError } from './types';
import { User } from './entities';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { ServerRouter, serverRouter } from './trpc/trpc';
import { createServerContext } from './trpc/init';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import fastifyCors from '@fastify/cors';
import fastifySecureSession from '@fastify/secure-session';
import fastifyPassport from '@fastify/passport';

declare module 'fastify' {
  export interface FastifyRequest {
    currentUser: User;
  }
}

export const initServer = async (host = '0.0.0.0', port = 3101) => {
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
  }); // Initialize Passport
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
          const tokenUser = {
            email: profile.emails?.[0]?.value ?? '',
            name: profile.displayName,
            picture: profile.photos?.[0]?.value ?? '',
          };

          console.log('token', tokenUser);

          const user = await db.users.findOne({ email: tokenUser.email });
          let newUser: User;
          if (!user) {
            newUser = db.users.create({
              email: tokenUser.email,
              name: tokenUser.name,
              picture: tokenUser.picture,
              role: 'user',
            });
          } else {
            user.name = tokenUser.name;
            user.picture = tokenUser.picture;
            await db.em.persistAndFlush(user);
          }

          return done(null, user ?? newUser!);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  fastifyPassport.registerUserSerializer(async (user: { email: string }) => {
    return user.email;
  });
  fastifyPassport.registerUserDeserializer(async (email: string) => {
    const user = await db.users.findOne({ email });
    if (!user) {
      throw new AuthError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
    };
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
      successRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
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

  // Hooks
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

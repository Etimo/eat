import { TRPCError } from '@trpc/server';
import { procedure, router } from '../init';
import { createNewUser, getVerifiedIdentityToken, updateUser } from '#utils';
import { UserDto } from '#types';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import jwt from 'jsonwebtoken';

const SESSION_EXPIRATION = () => Date.now() + 1000 * 60 * 60 * 24;

export const authenticationRouter = router({
  session: procedure.query(async ({ ctx }) => {
    const { token, server } = ctx;
    if (!token) {
      const error: TRPCError = {
        name: 'NoTokenError',
        code: 'UNAUTHORIZED',
        message: 'Authorization token not provided',
      };
      throw new TRPCError(error);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const error: TRPCError = {
        name: 'NoSecretError',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'JWT secret is undefined',
      };
      throw new TRPCError(error);
    }

    try {
      const tokenUser = await getVerifiedIdentityToken(token);

      // Update or create user with Google user info.
      const { id: userId, role: userRole }: UserDto =
        (await updateUser(tokenUser)) ?? (await createNewUser(tokenUser));

      const sessionId = uuidv4();
      server.redis.hset(sessionId, {
        expiry: SESSION_EXPIRATION(),
        userId,
        userRole,
      });
      return { sessionId, userId };
    } catch (e) {
      if (e instanceof Error) {
        const error: TRPCError = {
          name: 'NoSecretError',
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message,
        };
        throw new TRPCError(error);
      }

      const error: TRPCError = {
        name: 'NoTokenError',
        code: 'UNAUTHORIZED',
        message: 'Unauthorizatized',
      };
      throw new TRPCError(error);
    }
  }),
  accessToken: procedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx: { token, server }, input: { sessionId } }) => {
      const { expiry, userId, userRole } =
        await server.redis.hgetall(sessionId);
      if (!expiry || parseInt(expiry) < Date.now()) {
        const error: TRPCError = {
          name: 'TokenExpiredError',
          code: 'UNAUTHORIZED',
          message: 'The access token has expired',
        };
        throw new TRPCError(error);
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        const error: TRPCError = {
          name: 'NoSecretError',
          code: 'INTERNAL_SERVER_ERROR',
          message: 'JWT secret is undefined',
        };
        throw new TRPCError(error);
      }

      const accessToken = jwt.sign({ userId, userRole }, secret, {
        expiresIn: 60 * 30,
      });

      await server.redis.hset(sessionId, {
        expiry: SESSION_EXPIRATION(),
        userId,
        userRole,
      });
      return { token: accessToken };
    }),
});

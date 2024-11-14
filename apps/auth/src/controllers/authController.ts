import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import {
  getVerifiedIdentityToken,
  createNewUser,
  getUserByEmail,
  updateUser,
} from '#utils';
import jwt from 'jsonwebtoken';
import { UserDto } from '#types';

const SESSION_EXPIRATION = () => Date.now() + 1000 * 60 * 60 * 24;
// Arrow function not supported, the server is bound to this
export async function authController(server: FastifyInstance) {
  server.get('/session', async (request, reply) => {
    const jwtAuthHeader = request.headers.authorization?.split('Bearer ')[1];
    if (!jwtAuthHeader) {
      return reply.code(401).send('Unauthorized');
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return reply.code(500).send('jwt secret not set');
    }

    try {
      const tokenUser = await getVerifiedIdentityToken(jwtAuthHeader);

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
        return reply.code(500).send(e.message);
      }
      return reply.code(401).send('Unauthorized');
    }
  });

  server.post<{ Body: { sessionId: string } }>(
    '/accessToken',
    async (request, reply) => {
      const sessionId = request.body.sessionId;
      const { expiry, userId, userRole } =
        await server.redis.hgetall(sessionId);
      if (!expiry || parseInt(expiry) < Date.now()) {
        return reply.code(401).send('Unauthorized');
      }
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return reply.code(500).send('jwt secret not set');
      }
      const token = jwt.sign({ userId, userRole }, secret, {
        expiresIn: 60 * 30,
      });

      await server.redis.hset(sessionId, {
        expiry: SESSION_EXPIRATION(),
        userId,
        userRole,
      });
      return { token };
    },
  );
}

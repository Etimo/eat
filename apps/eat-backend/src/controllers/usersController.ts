import { FastifyInstance } from 'fastify';
import { initORM } from '../db';
import { User } from '../entities';
import { wrap } from '@mikro-orm/core';

// This is only used by auth. Use trpc for the rest
// Arrow function not supported, the server is bound to this
export async function usersController(server: FastifyInstance) {
  const db = await initORM();

  server.post<{
    Body: { user: { name: string; email: string; picture: string } };
  }>('/', async (request) => {
    const { user } = request.body;
    const createdUser = await db.users.create(user as User);
    await db.em.flush();
    return createdUser;
  });

  server.patch<{
    Body: { user: { name: string; email: string; picture: string } };
  }>('/', async (request) => {
    const { user } = request.body;
    const createdUser = await db.users.findOneOrFail({ email: user.email });
    wrap(user).assign({ ...user });
    await db.em.flush();

    return createdUser;
  });
}

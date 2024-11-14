import { FastifyInstance } from 'fastify';
import { userData } from '../data';
import { initORM } from '../db';
import { ParamId } from '../types';
import { User } from '../entities';

// Arrow function not supported, the server is bound to this
export async function usersController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async () => {
    const users = await userData.list(db);
    if (!users.length) {
      return [];
    }
    return users.map(({ id, name, teamMemberships }) => ({
      id,
      name,
      team: teamMemberships
        .filter((tm) => !tm.memberTo)
        .map((tm) => ({ id: tm.team.id, name: tm.team.name }))[0],
    }));
  });

  server.get<ParamId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    const { id, name, picture, role, teamMemberships } = await userData.getById(
      db,
      uuid,
    );
    return {
      id,
      name,
      picture,
      role,
      team: teamMemberships
        .filter((tm) => !tm.memberTo)
        .map((tm) => ({ id: tm.team.id, name: tm.team.name }))[0],
    };
  });

  server.post<{ Body: { email: string } }>('/email', async (request) => {
    const { email } = request.body;
    const user = await userData.getByEmail(db, email);
    return user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        }
      : null;
  });

  server.post<{
    Body: { user: { name: string; email: string; picture: string } };
  }>('/', async (request) => {
    const { user } = request.body;
    const createdUser = await userData.create(db, user as User);
    return createdUser;
  });

  server.patch<{
    Body: { user: { name: string; email: string; picture: string } };
  }>('/', async (request) => {
    const { user } = request.body;
    const createdUser = await userData.update(db, user.email, user as User);
    return createdUser;
  });
}

import { FastifyInstance } from 'fastify';
import { userData } from '../data';
import { initORM } from '../db';
import { ParamId } from '../types';

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
    const { id, name, teamMemberships } = await userData.getById(db, uuid);
    return {
      id,
      name,
      team: teamMemberships
        .filter((tm) => !tm.memberTo)
        .map((tm) => ({ id: tm.team.id, name: tm.team.name }))[0],
    };
  });
}

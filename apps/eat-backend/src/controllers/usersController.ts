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
    return users.map(({ id, name, team }) => ({
      id,
      name,
      team: team ? { id: team?.id, name: team?.name } : null,
    }));
  });

  server.get<ParamId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    const { id, name, team, previousTeams } = await userData.getById(db, uuid);
    return {
      id,
      name,
      team: {
        id: team?.id,
        name: team?.name,
      },
      previousTeams: previousTeams.map((pt) => ({
        id: pt.id,
        name: pt.name,
      })),
    };
  });
}

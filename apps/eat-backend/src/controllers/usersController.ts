import { FastifyInstance } from 'fastify';
import { userData } from '../data';
import { initORM } from '../db';
import { QueryId } from '../types';

// Arrow function not supported, the server is bound to this
export async function usersController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async (_, reply) => {
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

  server.get<QueryId>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const { id, name, team } = await userData.getById(db, uuid);
    return { id, name, team: { id: team?.id, name: team?.name } };
  });
}

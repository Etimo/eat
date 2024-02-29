import { FastifyInstance } from 'fastify';
import { teamData } from '../data';
import { initORM } from '../db';
import { Body, QueryId, ValidationError } from '../types';

// Arrow function not supported, the server is bound to this
export async function teamsController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async (_, reply) => {
    const teams = await teamData.list(db);
    if (!teams.length) {
      return [];
    }
    return teams.map(({ id, name, users }) => ({
      id,
      name,
      users: users.map(({ id, name }) => ({ id, name })),
    }));
  });

  server.get<QueryId>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const { id, name, users } = await teamData.getById(db, uuid);
    return { id, name, users: users.map(({ id, name }) => ({ id, name })) };
  });

  server.post<Body>('/', async (request, reply) => {
    const body = request.body;
    if (!body.name) {
      const error = new ValidationError('Team name is required');
      return reply.code(400).send(error);
    }
    const { id, name } = await teamData.create(db, body.name);
    return { id, name };
  });

  server.patch<QueryId & Body>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const body = request.body;
    if (!body.name) {
      const error = new ValidationError('Team name is required');
      return reply.code(400).send(error);
    }
    const { id, name } = await teamData.update(db, uuid, body.name);
    return { id, name };
  });

  server.delete<QueryId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    await teamData.remove(db, uuid);
    return { sucess: true };
  });

  server.post<QueryId & UsersRequest>(
    '/addMembers/:uuid',
    async (request, reply) => {
      const { uuid } = request.params;
      const body = request.body;
      if (!body.users || !body.users.length) {
        const error = new ValidationError('At least one user is required');
        return reply.code(400).send(error);
      }
      const team = await teamData.addMembers(db, uuid, body.users);
      return team;
    },
  );
  server.post<QueryId & UsersRequest>(
    '/removeMembers/:uuid',
    async (request, reply) => {
      const { uuid } = request.params;
      const body = request.body;
      if (!body.users || !body.users.length) {
        const error = new ValidationError('At least one user is required');
        return reply.code(400).send(error);
      }

      const team = await teamData.removeMembers(db, uuid, body.users);
      return team;
    },
  );
}

interface UsersRequest {
  Body: { users: string[] };
}

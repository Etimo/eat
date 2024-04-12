import { FastifyInstance } from 'fastify';
import { teamData } from '../data';
import { initORM } from '../db';
import { Body, ParamId, ValidationError } from '../types';
import { Team } from '../entities';

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

  server.get<ParamId>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const { id, name, users } = await teamData.getById(db, uuid);
    return { id, name, users: users.map(({ id, name }) => ({ id, name })) };
  });

  server.post<CreateTeamRequest>('/', async (request, reply) => {
    const body = request.body;
    if (!body.team.name) {
      const error = new ValidationError('Team name is required');
      return reply.code(400).send(error);
    }
    const { id, name } = await teamData.create(db, body.team);
    return { id, name };
  });

  server.patch<ParamId & Body>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const body = request.body;
    if (!body.name) {
      const error = new ValidationError('Team name is required');
      return reply.code(400).send(error);
    }
    const { id, name } = await teamData.update(db, uuid, body.name);
    return { id, name };
  });

  server.delete<ParamId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    await teamData.remove(db, uuid);
    return { sucess: true };
  });

  server.post<ParamId & UsersRequest>(
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
  server.post<ParamId & UsersRequest>(
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
interface CreateTeamRequest {
  Body: {
    team: Team;
  };
}

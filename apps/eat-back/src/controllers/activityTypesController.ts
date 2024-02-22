import { FastifyInstance } from 'fastify';
import { activityTypeData } from '../data';
import { initORM } from '../db';
import { Query, ValidationError } from '../types';

interface Body {
  Body: { name: string };
}
// Arrow function not supported, the server is bound to this
export async function activityTypesController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async (_, reply) => {
    const activityTypes = await activityTypeData.list(db);
    if (!activityTypes.length) {
      return [];
    }
    return activityTypes.map(({ id, name }) => ({ id, name }));
  });

  server.get<Query>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const { id, name } = await activityTypeData.getById(db, uuid);
    return { id, name };
  });

  server.post<Body>('/', async (request, reply) => {
    const body = request.body;
    if (!body.name) {
      const error = new ValidationError('Activity type name is required');
      return reply.code(400).send(error);
    }

    const { id, name } = await activityTypeData.create(db, body.name);
    return { id, name };
  });

  server.patch<Query & Body>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const body = request.body;
    if (!body.name) {
      const error = new ValidationError('Activity type name is required');
      return reply.code(400).send(error);
    }

    const { id, name } = await activityTypeData.update(db, uuid, body.name);
    return { id, name };
  });

  server.delete<Query>('/:uuid', async (request) => {
    const { uuid } = request.params;
    await activityTypeData.remove(db, uuid);

    return { sucess: true };
  });
}

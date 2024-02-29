import { FastifyInstance } from 'fastify';
import { activityData } from '../data';
import { initORM } from '../db';
import { QueryId, ValidationError } from '../types';
import { Activity } from 'src/entities';

// Arrow function not supported, the server is bound to this
export async function activitiesController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async () => {
    const activites = await activityData.list(db);
    if (!activites.length) {
      return [];
    }

    return activites.map((activity) => mapActivity(activity));
  });

  server.get<QueryId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    const activity = await activityData.getById(db, uuid);

    return mapActivity(activity);
  });

  server.get<QueryId>('/user/:uuid', async (request) => {
    const { uuid } = request.params;
    const activites = await activityData.getByUser(db, uuid);

    return activites.map((activity) =>
      mapActivity(activity, { includeUser: false }),
    );
  });

  server.get<QueryId>('/team/:uuid', async (request) => {
    const { uuid } = request.params;
    const activites = await activityData.getByTeam(db, uuid);

    return activites.map((activity) => mapActivity(activity));
  });

  server.post<ActivityRequest>('/', async (request, reply) => {
    const body = request.body;
    if (!body || !body.activity) {
      const error = new ValidationError(
        'Activity is missing required parameters',
      );
      return reply.code(400).send(error);
    }
    const activity = await activityData.create(db, body.activity);
    return mapActivity(activity);
  });

  server.delete<QueryId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    await activityData.remove(db, uuid);
    return { sucess: true };
  });
}

interface ActivityRequest {
  Body: { activity: Activity };
}

const mapActivity = (
  activity: Activity,
  { includeUser }: { includeUser: boolean } = { includeUser: true },
) => {
  const { id, time, date, activityType, user } = activity;
  const mapped = {
    id,
    time,
    date,
    activityType: { id: activityType.id, name: activityType.name },
  };

  return includeUser
    ? { ...mapped, user: { id: user.id, name: user.name } }
    : mapped;
};

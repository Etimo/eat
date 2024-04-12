import { FastifyInstance } from 'fastify';
import { activityData } from '../data';
import { initORM } from '../db';
import { ParamId, ValidationError } from '../types';
import { Activity } from 'src/entities';
import dayjs from 'dayjs';

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

  server.get<ParamId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    const activity = await activityData.getById(db, uuid);

    return mapActivity(activity);
  });

  server.get<ParamId>('/user/:uuid', async (request) => {
    const { uuid } = request.params;
    const activities = await activityData.getByUser(db, uuid);

    return activities.map((activity) =>
      mapActivity(activity, { includeUser: false }),
    );
  });

  server.get<ParamId>('/team/:uuid', async (request) => {
    const { uuid } = request.params;
    const activities = await activityData.getByTeam(db, uuid);
    console.log(activities);
    return activities.map((activity) => mapActivity(activity));
  });

  server.get<ParamId>('/user/:uuid/months', async (request) => {
    const { uuid } = request.params;
    const activities = await activityData.getByUser(db, uuid);

    const months = [
      ...new Set(
        activities
          .sort((a, b) =>
            dayjs(a.date).month() > dayjs(b.date).month() ? 1 : -1,
          )
          .map(({ date }) => dayjs(date).format('MMMM')),
      ),
    ].filter(Boolean);

    return months;
  });

  server.get<ParamId>('/user/:uuid/groupByMonth', async (request) => {
    const { uuid } = request.params;
    const activities = await activityData.getByUser(db, uuid);

    const months = [
      ...new Set(
        activities
          .sort((a, b) =>
            dayjs(a.date).month() > dayjs(b.date).month() ? 1 : -1,
          )
          .map(({ date }) => dayjs(date).format('MMMM')),
      ),
    ].filter(Boolean);

    const activitiesPerMonth = (month: string) => {
      return activities
        .filter(({ date }) => dayjs(date).format('MMMM') === month)
        .sort((a, b) => (a.date > b.date ? -1 : 1));
    };

    return months.map((month) => ({
      month,
      activities: activitiesPerMonth(month),
    }));
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

  server.delete<ParamId>('/:uuid', async (request) => {
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

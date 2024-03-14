import { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { initTestServer } from './initTestServer';
import { MikroORM } from '@mikro-orm/mysql';
import { Activity, Team, User } from '../../src/entities';
import { EntityManager } from '@mikro-orm/core';
import { TestSeeder } from '../../src/seeders';

let testServer: FastifyInstance;
let testOrm: MikroORM;

interface TestContext {
  em: EntityManager;
}

describe('Activities', () => {
  beforeAll(async () => {
    const { server, orm } = await initTestServer();
    testServer = server;
    testOrm = orm;
  });

  beforeEach<TestContext>(async (context) => {
    await testOrm.schema.refreshDatabase();

    const seeder = testOrm.getSeeder();
    await seeder.seed(TestSeeder);

    context.em = testOrm.em.fork();
  });

  afterAll(async () => {
    await testServer.close();
  });

  it('Should list all activities', async () => {
    const response = await testServer.inject({
      method: 'get',
      url: '/activity',
    });
    const data = response.json<unknown[]>();

    expect(response.statusCode).toBe(200);
    expect(data.length).toEqual(12);
  });

  it<TestContext>('Should fetch one user using id', async ({ em }) => {
    const activity = (
      await em.findAll(Activity, { populate: ['activityType', 'user'] })
    ).pop();

    const response = await testServer.inject({
      method: 'get',
      url: `/activity/${activity?.id}`,
    });
    const data = response.json<Activity>();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: activity?.id,
      time: activity?.time,
      date: activity?.date,
      activityType: {
        id: activity?.activityType.id,
        name: activity?.activityType.name,
      },
      user: { id: activity?.user.id, name: activity?.user.name },
    });
  });

  it<TestContext>('Should fetch all activities for one user using its id', async ({
    em,
  }) => {
    const user = (
      await em.find(
        User,
        { activities: { $ne: null } },
        {
          orderBy: { activities: { activityType: { name: 'ASC' } } },
          populate: ['activities', 'activities.activityType'],
        },
      )
    ).pop();

    expect(user).toBeTruthy();
    expect(user?.activities.length).toBeGreaterThan(0);

    const response = await testServer.inject({
      method: 'get',
      url: `/activity/user/${user?.id}`,
    });
    const data = response.json<Activity[]>();

    expect(response.statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(user?.activities.length);
    expect(data[0]?.user).toBeFalsy();
  });

  it<TestContext>('Should fetch all activities for one team using its id', async ({
    em,
  }) => {
    const team = (
      await em.find(
        Team,
        { users: { activities: { $ne: null } } },
        {
          orderBy: { users: { activities: { activityType: { name: 'ASC' } } } },
          populate: [
            'users',
            'users.activities',
            'users.activities.activityType',
          ],
        },
      )
    ).pop();
    const numberOfActivites = team?.users
      .map(({ activities: activity }) => activity.length)
      .reduce((total, current) => total + current, 0);

    expect(team).toBeTruthy();
    expect(numberOfActivites).toBeGreaterThan(0);

    const response = await testServer.inject({
      method: 'get',
      url: `/activity/team/${team?.id}`,
    });
    const data = response.json<Activity[]>();

    expect(response.statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(numberOfActivites);
    expect(data[0]?.user).toBeTruthy();
  });

  it('Should respond 404 when fetching user with invalid id', async () => {
    const slug = '12345-12345';
    const response = await testServer.inject({
      method: 'get',
      url: `/user/${slug}`,
    });
    expect(response.statusCode).toBe(404);
  });
});

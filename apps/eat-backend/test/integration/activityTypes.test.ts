import { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { initTestServer } from './initTestServer';
import { MikroORM } from '@mikro-orm/mysql';
import { ActivityType } from '../../src/entities';
import { EntityManager } from '@mikro-orm/core';
import { TestSeeder } from '../../src/seeders';

let testServer: FastifyInstance;
let testOrm: MikroORM;

interface TestContext {
  em: EntityManager;
}

describe('Activity types', () => {
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

  it('Should list all activity types', async () => {
    const response = await testServer.inject({
      method: 'get',
      url: '/activitytype',
    });
    const data = response.json<{ id: string; name: string }[]>();

    expect(response.statusCode).toBe(200);
    expect(data.length).toEqual(3);
    expect(data.map(({ name }) => name)).toContain('Löpning');
    expect(data.map(({ name }) => name)).toContain('Klättring');
    expect(data.map(({ name }) => name)).toContain('Promenad');
  });

  it<TestContext>('Should fetch activity type using id', async ({ em }) => {
    const activityType = await em.findOne(ActivityType, {
      name: 'Löpning',
    });
    const response = await testServer.inject({
      method: 'get',
      url: `/activitytype/${activityType?.id}`,
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: activityType?.id,
      name: activityType?.name,
    });
  });

  it('Should respond 404 when fetching activity type with invalid id', async () => {
    const slug = '12345-12345';
    const response = await testServer.inject({
      method: 'get',
      url: `/activitytype/${slug}`,
    });

    expect(response.statusCode).toBe(404);
  });

  it<TestContext>('Should create new activity type using post', async ({
    em,
  }) => {
    const response = await testServer.inject({
      method: 'post',
      body: { name: 'Discgolf' },
      url: '/activitytype',
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data.name).toEqual('Discgolf');

    const activityTypes = await em.findAll(ActivityType);
    expect(activityTypes.length).toBe(4);
    expect(activityTypes.map(({ name }) => name)).toContain('Discgolf');
  });

  it('Should not create new acitivty type using post if validation fails', async () => {
    const response = await testServer.inject({
      method: 'post',
      body: {},
      url: '/activitytype',
    });

    expect(response.statusCode).toBe(400);
  });

  it<TestContext>('Should update name of existing activity type using patch', async ({
    em,
  }) => {
    const activityType = await em.findOne(ActivityType, {
      name: 'Löpning',
    });
    const response = await testServer.inject({
      method: 'patch',
      body: { name: 'Disc_golf' },
      url: `/activitytype/${activityType?.id}`,
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: activityType?.id,
      name: 'Disc_golf',
    });
  });

  it('Should respond 404 when updating activity type with invalid id', async () => {
    const slug = '12345-12345';
    const response = await testServer.inject({
      method: 'patch',
      body: { name: 'Disc_golf' },
      url: `/activitytype/${slug}`,
    });

    expect(response.statusCode).toBe(404);
  });

  it<TestContext>('Should delete activity type', async ({ em }) => {
    const post = await testServer.inject({
      method: 'post',
      body: { name: 'Vedklyvning' },
      url: '/activitytype',
    });
    const data = post.json<{ id: string; name: string }>();

    expect(post.statusCode).toBe(200);
    expect(data.name).toEqual('Vedklyvning');

    const activityTypesBeforeRemove = await em.findAll(ActivityType);
    expect(activityTypesBeforeRemove.length).toBe(4);
    expect(activityTypesBeforeRemove.map(({ name }) => name)).toContain(
      'Vedklyvning',
    );

    const response = await testServer.inject({
      method: 'delete',
      url: `/activitytype/${data?.id}`,
    });

    expect(response.statusCode).toBe(200);

    const activityTypesAfterRemove = await em.findAll(ActivityType);
    expect(activityTypesAfterRemove.length).toBe(3);
    expect(activityTypesAfterRemove.map(({ name }) => name)).to.not.contain(
      'Vedklyvning',
    );
  });
});

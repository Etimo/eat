import { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { initTestServer } from './initTestServer';
import { MikroORM } from '@mikro-orm/mysql';
import { User } from '../../src/entities';
import { EntityManager } from '@mikro-orm/core';
import { TestSeeder } from '../../src/seeders';

let testServer: FastifyInstance;
let testOrm: MikroORM;

interface TestContext {
  em: EntityManager;
}

describe('Users', () => {
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

  it('Should list all users', async () => {
    const response = await testServer.inject({
      method: 'get',
      url: '/user',
    });
    const data =
      response.json<
        { id: string; name: string; team: { id: string; name: string } }[]
      >();

    expect(response.statusCode).toBe(200);
    expect(data.length).toEqual(12);
  });

  it<TestContext>('Should fetch one user using id', async ({ em }) => {
    const user = (
      await em.findAll(User, {
        where: { teamMemberships: { $ne: null } },
        populate: ['teamMemberships', 'teamMemberships.team'],
      })
    ).pop();

    const response = await testServer.inject({
      method: 'get',
      url: `/user/${user?.id}`,
    });
    const data = response.json();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: user?.id,
      name: user?.name,
      team: user?.teamMemberships.map((tm) => ({
        id: tm.team.id,
        name: tm.team.name,
      }))[0],
    });
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

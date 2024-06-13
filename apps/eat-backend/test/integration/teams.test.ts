import { FastifyInstance } from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { initTestServer } from './initTestServer';
import { MikroORM, SqlEntityManager } from '@mikro-orm/mysql';
import { Team, User } from '../../src/entities';
import { TestSeeder } from '../../src/seeders';

let testServer: FastifyInstance;
let testOrm: MikroORM;

interface TestContext {
  em: SqlEntityManager;
}

describe('Teams', () => {
  beforeAll(async () => {
    const { server, orm } = await initTestServer();
    testServer = server;
    testOrm = orm;
  });

  beforeEach<TestContext>(async (context) => {
    await testOrm.schema.refreshDatabase();

    const seeder = testOrm.getSeeder();
    await seeder.seed(TestSeeder);

    context.em = testOrm.em.fork({});
  });

  afterAll(async () => {
    await testServer.close();
  });

  it('Should list all teams', async () => {
    const response = await testServer.inject({
      method: 'get',
      url: '/team',
    });
    const data = response.json<{ id: string; name: string }[]>();
    expect(response.statusCode).toBe(200);
    expect(data.length).toEqual(3);
  });

  it<TestContext>('Should fetch team using id', async ({ em }) => {
    const team = (await em.findAll(Team)).shift();
    const response = await testServer.inject({
      method: 'get',
      url: `/team/${team?.id}`,
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data.id).toEqual(team?.id);
    expect(data.name).toEqual(team?.name);
  });

  it('Should respond 404 when fetching team with invalid id', async () => {
    const slug = '12345-12345';
    const response = await testServer.inject({
      method: 'get',
      url: `/team/${slug}`,
    });

    expect(response.statusCode).toBe(404);
  });

  it<TestContext>('Should create new team using post', async ({ em }) => {
    const response = await testServer.inject({
      method: 'post',
      body: { team: { name: 'The new cool team' } },
      url: '/team',
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data.name).toEqual('The new cool team');

    const teams = await em.findAll(Team);
    expect(teams.length).toBe(4);
    expect(teams.map(({ name }) => name)).toContain('The new cool team');
  });

  it('Should not create new team using post if validation fails', async () => {
    const response = await testServer.inject({
      method: 'post',
      body: {},
      url: '/team',
    });

    expect(response.statusCode).toBe(400);
  });

  it<TestContext>('Should update name of existing team using patch', async ({
    em,
  }) => {
    const team = (await em.findAll(Team)).shift();
    const response = await testServer.inject({
      method: 'patch',
      body: { name: 'The new cool team name' },
      url: `/team/${team?.id}`,
    });
    const data = response.json<{ id: string; name: string }>();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: team?.id,
      name: 'The new cool team name',
    });
  });

  it('Should respond 404 when updating team with invalid id', async () => {
    const slug = '12345-12345';
    const response = await testServer.inject({
      method: 'patch',
      body: { name: 'The new cool team name' },
      url: `/team/${slug}`,
    });

    expect(response.statusCode).toBe(404);
  });

  it<TestContext>('Should delete team', async ({ em }) => {
    const team = (await em.findAll(Team)).shift();
    const teamId = team?.id;
    expect(teamId).toBeTruthy();

    const response = await testServer.inject({
      method: 'delete',
      url: `/team/${teamId}`,
    });

    expect(response.statusCode).toBe(200);

    const teams = await em.findAll(Team);
    expect(teams.length).toBe(2);
    expect(teams.map(({ name }) => name)).to.not.contain(teamId);
  });

  it<TestContext>('Should add a new user to the team', async ({ em }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships'] },
      )
    ).shift();
    const user = (
      await em.find(
        User,
        { teamMemberships: null },
        { populate: ['teamMemberships'] },
      )
    ).pop();

    expect(team?.teamMemberships.length).toBe(4);
    expect(user).toBeTruthy();

    const response = await testServer.inject({
      method: 'post',
      url: `/team/addMembers/${team?.id}`,
      body: { users: [user?.id] },
    });
    const data = response.json<{ id: string; name: string; users: User[] }>();

    expect(response.statusCode).toBe(200);
    expect(data.id).toBe(team?.id);
    expect(data.users.length).toBe((team?.teamMemberships.length ?? 0) + 1);
    expect(data.users.map(({ id }) => id)).toContain(user?.id);
  });

  it<TestContext>('Should add a two new users to the team', async ({ em }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships'] },
      )
    ).shift();
    const users = (
      await em.find(
        User,
        { teamMemberships: null },
        { populate: ['teamMemberships'] },
      )
    ).slice(0, 2);

    expect(team?.teamMemberships.length).toBe(4);
    expect(users.length).toBe(2);

    const response = await testServer.inject({
      method: 'post',
      url: `/team/addMembers/${team?.id}`,
      body: { users: users.map(({ id }) => id) },
    });
    const data = response.json<{ id: string; name: string; users: User[] }>();

    expect(response.statusCode).toBe(200);
    expect(data.users.length).toBe((team?.teamMemberships.length ?? 0) + 2);
  });

  it<TestContext>('Should return 404 if no users are provided during add', async ({
    em,
  }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships'] },
      )
    ).shift();

    expect(team?.teamMemberships.length).toBe(4);

    let response = await testServer.inject({
      method: 'post',
      url: `/team/addMembers/${team?.id}`,
      body: { users: [] },
    });
    expect(response.statusCode).toBe(400);

    response = await testServer.inject({
      method: 'post',
      url: `/team/addMembers/${team?.id}`,
      body: { users: null },
    });
    expect(response.statusCode).toBe(400);

    response = await testServer.inject({
      method: 'post',
      url: `/team/addMembers/${team?.id}`,
      body: {},
    });
    expect(response.statusCode).toBe(400);
  });

  it<TestContext>('Should remove a user from the team', async ({ em }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships', 'teamMemberships.user'] },
      )
    ).shift();
    const user = team?.teamMemberships.map((tm) => tm.user)[0];

    expect(team?.teamMemberships.length).toBe(4);

    const response = await testServer.inject({
      method: 'post',
      url: `/team/removeMembers/${team?.id}`,
      body: { users: [user?.id] },
    });
    const data = response.json<{ id: string; name: string; users: User[] }>();

    expect(response.statusCode).toBe(200);
    expect(data.users.length).toBe(3);
    expect(data.users.map(({ id }) => id)).to.not.contain(user?.id);
  });

  it<TestContext>('Should remove two users from the team', async ({ em }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships', 'teamMemberships.user'] },
      )
    ).shift();
    const users = team?.teamMemberships.map((tm) => tm.user).slice(0, 2);
    expect(team?.teamMemberships.length).toBe(4);

    const response = await testServer.inject({
      method: 'post',
      url: `/team/removeMembers/${team?.id}`,
      body: { users: users?.map(({ id }) => id) },
    });
    const data = response.json<{ id: string; name: string; users: User[] }>();

    expect(response.statusCode).toBe(200);
    expect(data.users.length).toBe(2);
  });

  it<TestContext>('Should return 404 if no users are provided during remove', async ({
    em,
  }) => {
    const team = (
      await em.find(
        Team,
        { teamMemberships: { $ne: null } },
        { populate: ['teamMemberships', 'teamMemberships.user'] },
      )
    ).shift();

    expect(team?.teamMemberships.length).toBe(4);

    let response = await testServer.inject({
      method: 'post',
      url: `/team/removeMembers/${team?.id}`,
      body: { users: [] },
    });
    expect(response.statusCode).toBe(400);

    response = await testServer.inject({
      method: 'post',
      url: `/team/removeMembers/${team?.id}`,
      body: { users: null },
    });
    expect(response.statusCode).toBe(400);

    response = await testServer.inject({
      method: 'post',
      url: `/team/removeMembers/${team?.id}`,
      body: {},
    });
    expect(response.statusCode).toBe(400);
  });
});

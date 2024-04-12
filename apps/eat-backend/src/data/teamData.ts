import { Team } from '../entities';
import { DatabaseServices } from '../db';
import { wrap } from '@mikro-orm/core';
import { userData } from '.';

const list = async (db: DatabaseServices) => {
  return db.teams.findAll({ populate: ['users'] });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.teams.findOneOrFail({ id }, { populate: ['users'] });
};

const getByIds = async (db: DatabaseServices, ids: string[]) => {
  return db.teams.find(ids);
};

const create = async (db: DatabaseServices, team: Team) => {
  const t = db.teams.create(team);
  await db.em.flush();

  t.users.map((user) => {
    wrap(user).assign({ team: t.id });
  });
  await db.em.flush();
  return t;
};

const update = async (db: DatabaseServices, id: string, name: string) => {
  const team = await db.teams.findOneOrFail(id);
  wrap(team).assign({ name });

  await db.em.flush();
  return team;
};

const remove = async (db: DatabaseServices, id: string) => {
  const team = await db.teams.findOneOrFail(id);
  return db.em.remove(team).flush();
};

const addMembers = async (
  db: DatabaseServices,
  id: string,
  userIds: string[],
) => {
  const team = await db.teams.findOneOrFail(id, { populate: ['users'] });
  const users = await userData.getByIds(db, userIds);
  wrap(team).assign({ users: [...team.users, ...users] });
  users.map((user) => wrap(user).assign({ team }));

  await db.em.flush();
  return team;
};

const removeMembers = async (
  db: DatabaseServices,
  id: string,
  userIds: string[],
) => {
  const team = await db.teams.findOneOrFail(id, { populate: ['users'] });
  const users = team.users.filter((user) => !userIds.includes(user.id));

  wrap(team).assign({ users });

  await db.em.flush();
  return team;
};

export const teamData = {
  list,
  getById,
  getByIds,
  create,
  update,
  remove,
  addMembers,
  removeMembers,
};

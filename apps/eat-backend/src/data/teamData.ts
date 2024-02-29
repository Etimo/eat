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

const create = async (db: DatabaseServices, name: string) => {
  const team = db.teams.create({ name });
  await db.em.flush();
  return team;
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
  create,
  update,
  remove,
  addMembers,
  removeMembers,
};

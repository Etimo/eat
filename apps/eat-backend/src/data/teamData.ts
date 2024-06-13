import { Team, TeamMembership } from '../entities';
import { DatabaseServices } from '../db';
import { wrap } from '@mikro-orm/core';
import { userData } from '.';

const list = async (db: DatabaseServices) => {
  return db.teams.findAll({ populate: ['teamMemberships'] });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.teams.findOneOrFail(
    { id },
    { populate: ['teamMemberships', 'teamMemberships.user'] },
  );
};

const getByIds = async (db: DatabaseServices, ids: string[]) => {
  return db.teams.find(ids);
};

const create = async (db: DatabaseServices, team: Team) => {
  const t = db.teams.create(team);
  await db.em.flush();

  // t.users.map((user) => {
  //   wrap(user).assign({ team: t.id });
  // });
  // await db.em.flush();
  return t;
};

const update = async (db: DatabaseServices, id: string, name: string) => {
  const team = await db.teams.findOneOrFail(id);
  wrap(team).assign({ name });

  await db.em.flush();
  return team;
};

const remove = async (db: DatabaseServices, id: string) => {
  const team = await db.teams.findOneOrFail(id, { populate: ['*'] });
  team.teamMemberships.map((tm) => db.em.remove(tm).flush());
  return db.em.remove(team).flush();
};

const addMembers = async (
  db: DatabaseServices,
  id: string,
  userIds: string[],
) => {
  const team = await db.teams.findOneOrFail(id, {
    populate: ['teamMemberships', 'teamMemberships.user'],
  });
  const users = userIds.filter(
    (id) => !team.teamMemberships.map((tm) => tm.user.id).includes(id),
  );
  users.map((userId) =>
    db.teamMemberships.create({
      team: id,
      user: userId,
      memberFrom: new Date().toISOString(),
    }),
  );

  await db.em.flush();
  return await db.teams.findOneOrFail(id, {
    populate: ['teamMemberships', 'teamMemberships.user'],
  });
};

const removeMembers = async (
  db: DatabaseServices,
  id: string,
  userIds: string[],
) => {
  const teamMemberships = await db.teamMemberships.find({
    team: { id },
    user: { id: { $in: userIds } },
  });

  teamMemberships.map((tm) =>
    wrap(tm).assign({ memberTo: new Date().toISOString() }),
  );

  await db.em.flush();
  return await db.teams.findOneOrFail(id, {
    populate: ['teamMemberships', 'teamMemberships.user'],
  });
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

import { teamData } from '.';
import { DatabaseServices } from '../db';
import { wrap } from '@mikro-orm/core';

const list = async (db: DatabaseServices) => {
  return db.competitions.findAll({
    orderBy: { startDate: 'ASC' },
    populate: ['teams'],
  });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.competitions.findOneOrFail({ id }, { populate: ['teams'] });
};

const create = async (db: DatabaseServices, comp: Competition) => {
  const competition = db.competitions.create({ ...comp });
  await db.em.flush();
  return competition;
};

const update = async (db: DatabaseServices, id: string, comp: Competition) => {
  const competition = await db.competitions.findOneOrFail(id, {
    populate: ['teams'],
  });
  wrap(competition).assign({ ...comp });

  await db.em.flush();
  return competition;
};

const remove = async (db: DatabaseServices, id: string) => {
  const competition = await db.competitions.findOneOrFail({ id });
  return db.em.remove(competition).flush();
};

const addTeam = async (db: DatabaseServices, id: string, teamIds: string[]) => {
  const competition = await db.competitions.findOneOrFail(id, {
    populate: ['teams'],
  });
  const teams = await teamData.getByIds(db, teamIds);
  wrap(competition).assign({ teams: [...competition.teams, ...teams] });

  await db.em.flush();
  return competition;
};

const removeTeam = async (
  db: DatabaseServices,
  id: string,
  teamIds: string[],
) => {
  const competition = await db.competitions.findOneOrFail(id, {
    populate: ['teams'],
  });
  const teams = competition.teams.filter((team) => !teamIds.includes(team.id));

  wrap(competition).assign({ teams });

  await db.em.flush();
  return competition;
};

export const competitionData = {
  list,
  getById,
  create,
  update,
  remove,
  addTeam,
  removeTeam,
};

type Competition = {
  startDate: string;
  endDate: string;
};

import { User } from '../entities';
import { DatabaseServices } from '../db';
import { wrap } from '@mikro-orm/core';

const list = async (db: DatabaseServices) => {
  return db.users.findAll({ populate: ['team'] });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.users.findOneOrFail({ id }, { populate: ['team'] });
};

const getByIds = async (db: DatabaseServices, ids: string[]) => {
  return db.users.find(ids);
};

const create = async (db: DatabaseServices, name: string) => {
  const team = db.users.create({ name });
  await db.em.flush();
  return team;
};

const update = async (
  db: DatabaseServices,
  id: string,
  update: Partial<Pick<User, 'name'>>,
) => {
  const team = await db.users.findOneOrFail(id);
  wrap(team).assign({ ...update });

  await db.em.flush();
  return team;
};

const remove = async (db: DatabaseServices, id: string) => {
  const team = await db.users.findOneOrFail(id);
  return db.em.remove(team).flush();
};

export const userData = {
  list,
  getById,
  getByIds,
  create,
  update,
  remove,
};

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
  const user = db.users.create({ name });
  await db.em.flush();
  return user;
};

const update = async (
  db: DatabaseServices,
  id: string,
  update: Partial<Pick<User, 'name'>>,
) => {
  const user = await db.users.findOneOrFail(id);
  wrap(user).assign({ ...update });

  await db.em.flush();
  return user;
};

const remove = async (db: DatabaseServices, id: string) => {
  const user = await db.users.findOneOrFail(id);
  return db.em.remove(user).flush();
};

export const userData = {
  list,
  getById,
  getByIds,
  create,
  update,
  remove,
};

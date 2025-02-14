import { User } from '../entities';
import { DatabaseServices } from '../db';
import { wrap } from '@mikro-orm/core';

const list = async (db: DatabaseServices) => {
  return db.users.findAll({
    populate: ['teamMemberships', 'teamMemberships.team'],
    orderBy: { name: 'ASC' },
  });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.users.findOneOrFail({ id }, { populate: ['teamMemberships'] });
};

const getByEmail = async (db: DatabaseServices, email: string) => {
  return db.users.findOne({ email });
};

const getByIds = async (db: DatabaseServices, ids: string[]) => {
  return db.users.find(ids);
};

const create = async (db: DatabaseServices, user: User) => {
  const createdUser = db.users.create(user);
  await db.em.flush();
  return createdUser;
};

const update = async (
  db: DatabaseServices,
  email: string,
  update: Partial<User>,
) => {
  const user = await db.users.findOneOrFail({ email });
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
  getByEmail,
  getByIds,
  create,
  update,
  remove,
};

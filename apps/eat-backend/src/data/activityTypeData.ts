import { DatabaseServices } from '../db';
import { NotFoundError, wrap } from '@mikro-orm/core';

const list = async (db: DatabaseServices) => {
  return db.activityTypes.findAll();
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.activityTypes.findOneOrFail({ id });
};

const create = async (db: DatabaseServices, name: string) => {
  const acitivtyType = db.activityTypes.create({ name });
  await db.em.flush();
  return acitivtyType;
};

const update = async (db: DatabaseServices, id: string, name: string) => {
  const activityType = await db.activityTypes.findOneOrFail(id);
  wrap(activityType).assign({ name });

  await db.em.flush();
  return activityType;
};

const remove = async (db: DatabaseServices, id: string) => {
  const activityType = await db.activityTypes.findOneOrFail(id);
  return db.em.remove(activityType).flush();
};

export const activityTypeData = {
  list,
  getById,
  create,
  update,
  remove,
};

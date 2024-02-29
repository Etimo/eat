import { Activity } from 'src/entities';
import { DatabaseServices } from '../db';

const list = async (db: DatabaseServices) => {
  return db.activities.findAll({ populate: ['activityType', 'user'] });
};

const getById = async (db: DatabaseServices, id: string) => {
  return db.activities.findOneOrFail(
    { id },
    { populate: ['activityType', 'user'] },
  );
};

const getByUser = async (db: DatabaseServices, userId: string) => {
  return db.activities.find(
    { user: { id: userId } },
    {
      orderBy: { activityType: { name: 'ASC' } }, // This should probably be creation date when all the data isn't created at the same time..
      populate: ['activityType', 'user'],
    },
  );
};

const getByTeam = async (db: DatabaseServices, teamId: string) => {
  return db.activities.find(
    { user: { team: { id: teamId } } },
    {
      orderBy: { activityType: { name: 'ASC' } }, // This should probably be creation date when all the data isn't created at the same time..
      populate: ['activityType', 'user'],
    },
  );
};

const create = async (db: DatabaseServices, activity: Activity) => {
  const createdActivity = db.activities.create(activity);
  await db.em.flush();
  return createdActivity;
};

const remove = async (db: DatabaseServices, id: string) => {
  const activity = await db.activities.findOneOrFail(id);
  return db.em.remove(activity).flush();
};

export const activityData = {
  list,
  getById,
  getByUser,
  getByTeam,
  create,
  remove,
};

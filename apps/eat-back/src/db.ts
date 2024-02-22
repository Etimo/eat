import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/mysql';
import { Activity, ActivityType, Team, User } from './entities';
import config from '../config/mikro-orm-app.config';
import { ActivityTypeSeeder } from './seeders';
import { TeamSeeder } from './seeders/TeamSeeder';

export type DatabaseServices = {
  orm: MikroORM;
  em: EntityManager;
  activities: EntityRepository<Activity>;
  activityTypes: EntityRepository<ActivityType>;
  teams: EntityRepository<Team>;
  users: EntityRepository<User>;
};

let cache: DatabaseServices;

export const initORM = async (options?: Options): Promise<DatabaseServices> => {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({ ...config, ...options });

  return (cache = {
    orm,
    em: orm.em,
    activities: orm.em.getRepository(Activity),
    activityTypes: orm.em.getRepository(ActivityType),
    teams: orm.em.getRepository(Team),
    users: orm.em.getRepository(User),
  });
};

export const seedBaseData = async (db: DatabaseServices) => {
  const activityTypesSeed = db.activityTypes.count().then(async (count) => {
    if (count === 0) {
      return db.orm.seeder.seed(ActivityTypeSeeder);
    }
    return Promise.resolve();
  });
  const teamsSeed = db.teams.count().then(async (count) => {
    if (count === 0) {
      return db.orm.seeder.seed(TeamSeeder);
    }
    return Promise.resolve();
  });

  return Promise.all([activityTypesSeed, teamsSeed]);
};

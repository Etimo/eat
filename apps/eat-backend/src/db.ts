import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
} from '@mikro-orm/mysql';
import {
  Activity,
  ActivityType,
  Competition,
  Team,
  TeamMembership,
  User,
} from './entities';
import config from '../config/mikro-orm-app.config';
import {
  ActivityTypeSeeder,
  DatabaseSeeder,
  TeamSeeder,
  UserSeeder,
} from './seeders';

export type DatabaseServices = {
  orm: MikroORM;
  em: EntityManager;
  activities: EntityRepository<Activity>;
  activityTypes: EntityRepository<ActivityType>;
  competitions: EntityRepository<Competition>;
  teams: EntityRepository<Team>;
  teamMemberships: EntityRepository<TeamMembership>;
  users: EntityRepository<User>;
};

let cache: DatabaseServices;

export const initORM = async (options?: Options): Promise<DatabaseServices> => {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
    driverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  });

  return (cache = {
    orm,
    em: orm.em,
    activities: orm.em.getRepository(Activity),
    activityTypes: orm.em.getRepository(ActivityType),
    competitions: orm.em.getRepository(Competition),
    teams: orm.em.getRepository(Team),
    teamMemberships: orm.em.getRepository(TeamMembership),
    users: orm.em.getRepository(User),
  });
};

export const seedUsers = async (db: DatabaseServices) => {
  return await db.orm.seeder.seed(UserSeeder);
};

export const seedBaseData = async (db: DatabaseServices) => {
  return await db.orm.seeder.seed(DatabaseSeeder);
};

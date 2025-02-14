import {
  Activity,
  ActivityType,
  Competition,
  Team,
  TeamMembership,
  User,
} from '../src/entities';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  dbName: process.env.DB_MAIN_NAME,
  debug: true,
  entities: [Activity, ActivityType, Competition, Team, TeamMembership, User],
  extensions: [SeedManager, Migrator],
  highlighter: new SqlHighlighter(),
  password: process.env.DB_MAIN_PASSWORD,
  user: process.env.DB_MAIN_USER,
};
export default config;

import { defineConfig } from '@mikro-orm/mysql';
import config from './mikro-orm.config';

export default defineConfig({
  ...config,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 3306),
});

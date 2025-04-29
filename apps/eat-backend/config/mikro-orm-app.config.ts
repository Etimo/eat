import { defineConfig } from '@mikro-orm/mysql';
import config from './mikro-orm.config';

export default defineConfig({
  ...config,
  host: process.env.DB_MAIN_PRIVATE_HOST,
  port: +(process.env.DB_MAIN_PORT ?? 3306),
});

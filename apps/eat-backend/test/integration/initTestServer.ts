import { initORM } from '../../src/db';
import { initServer } from '../../src/initServer';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export const initTestServer = async () => {
  const { orm } = await initORM({
    debug: false,
    dbName: process.env.DB_DATABASENAME,
    host: process.env.TEST_DB_HOST,
    port: +(process.env.TEST_DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.isConnected();

  const { server } = await initServer('localhost', 3100, false);
  return { server, orm };
};

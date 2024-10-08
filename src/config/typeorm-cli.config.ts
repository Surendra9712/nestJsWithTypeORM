import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  migrationsTableName: 'migrations',
  entities: [__dirname + '/../**/models/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
};

export const appDataSource = new DataSource(options);

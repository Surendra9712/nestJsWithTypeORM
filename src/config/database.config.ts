import * as process from 'process';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const databaseConfig = (): TypeOrmModuleOptions => {
  const dbConnection: string = process.env.DB_CONNECTION || 'mysql';

  if (dbConnection === 'mysql') {
    return {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || '',
      flags: [
        '--sql-mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION',
      ],
    };
  } else if (dbConnection === 'pgsql') {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || '',
      // other PostgreSQL-specific options
    };
  }

  throw new Error(`Invalid DB_CONNECTION: ${dbConnection}`);
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    const databaseOptions = databaseConfig();
    return {
      ...databaseOptions,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/../**/models/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      reconnectTries: 1,
      cli: {
        migrationsDir: [__dirname + '/../database/migrations'],
        entitiesDir: [__dirname + '/../database/models'],
      },
      autoLoadEntities: true,
    };
  },
};

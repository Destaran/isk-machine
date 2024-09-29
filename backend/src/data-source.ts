import 'reflect-metadata';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { migrations } from './migrations';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const appDataSourceConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '6543', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: process.env.NODE_ENV === 'test' ? false : ['schema', 'migration'],
  entities: [],
  migrations,
  migrationsRun: true,
  dropSchema: process.env.NODE_ENV === 'test',
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    enableKeepAlive: true,
    keepAliveInitialDelay: 300 * 1000,
  },
};

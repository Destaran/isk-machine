import 'reflect-metadata';
import { appDataSourceConfig } from 'src/data-source';
import { DataSource } from 'typeorm';

export const seederConfig = {
  ...appDataSourceConfig,
  entities: ['src/**/*.entity.ts'],
  host: 'localhost',
  database: 'isk-machine-db',
  username: 'postgres',
  password: 'postgres',
};

export default new DataSource(seederConfig);

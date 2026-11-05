import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as entities from '../entities/index.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...(process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: Number.parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'gov_report',
      }),
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true' || process.env.NODE_ENV === 'development',
  entities: Object.values(entities),
  migrations: [
    join(__dirname, '/../database/migrations/*{.ts,.js}'),
  ],
  subscribers: [
    join(__dirname, '/../**/*.subscriber{.ts,.js}'),
  ],
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;


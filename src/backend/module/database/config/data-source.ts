import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { StoredFileEntity } from '@/src/backend/module/storage/domains/entities';
import { UserEntity } from '@/src/backend/module/auth/domains/entities';
import { ProjectEntity, ProfileEntity } from '@/src/backend/module/portfolio/domains/entities';

dotenv.config({ path: join(process.cwd(), '.env') });

export const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [StoredFileEntity, UserEntity, ProjectEntity, ProfileEntity],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});

export const getDbConnection = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
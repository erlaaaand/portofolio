import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { StoredFileEntity } from '../../../module/storage/domains/entities/stored-file.entity';


dotenv.config({ path: join(process.cwd(), '.env') });

export const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  
  // Daftarkan semua entitas dari berbagai modul di sini
  entities: [StoredFileEntity],
  
  // Arahkan ke folder tempat skrip migrasi akan disimpan
  migrations: [join(__dirname, '..', '..', '..', 'database', 'migrations', '*.{ts,js}')],
  
  synchronize: false, // Wajib false agar migrasi bekerja dengan aman
  logging: process.env.DB_LOGGING === 'true',
});
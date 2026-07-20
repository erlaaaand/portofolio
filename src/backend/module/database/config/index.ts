import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';

const globalForTypeORM = global as unknown as { typeorm: DataSource };

export const getDbConnection = async (): Promise<DataSource> => {
  if (!globalForTypeORM.typeorm) {
    globalForTypeORM.typeorm = AppDataSource;
  }
  
  if (!globalForTypeORM.typeorm.isInitialized) {
    await globalForTypeORM.typeorm.initialize();
  }
  
  return globalForTypeORM.typeorm;
};

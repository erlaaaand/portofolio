import { IStorageAdapter } from '../adapters/storage.adapter.interface';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';
import { S3StorageAdapter } from '../adapters/s3-storage.adapter';

export const getStorageAdapter = (): IStorageAdapter => {
  const driver = process.env.STORAGE_DRIVER || 'local';

  if (driver === 's3' || driver === 'supabase') {
    return new S3StorageAdapter();
  }

  return new LocalStorageAdapter();
};
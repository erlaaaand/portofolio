import { IStorageAdapter, LocalStorageAdapter, S3StorageAdapter } from '@/src/backend/module/storage/infrastructures/adapters';

export const getStorageAdapter = (): IStorageAdapter => {
  const driver = process.env.STORAGE_DRIVER || 'local';

  if (driver === 's3' || driver === 'supabase') {
    return new S3StorageAdapter();
  }

  return new LocalStorageAdapter();
};
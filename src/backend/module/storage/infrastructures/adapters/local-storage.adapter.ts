import { mkdir, writeFile, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { IStorageAdapter, UploadResult } from './storage.adapter.interface';

export class LocalStorageAdapter implements IStorageAdapter {
  private uploadDir = process.env.UPLOAD_PATH || 'public/uploads';
  private baseUrl = process.env.NEXT_PUBLIC_UPLOAD_PUBLIC_URL || 'http://localhost:3000/uploads';

  async upload(fileBuffer: Buffer, fileKey: string, originalName: string, mimeType: string, size: number): Promise<UploadResult> {
    const fullPath = join(process.cwd(), this.uploadDir, fileKey);
    const dir = dirname(fullPath);

    await mkdir(dir, { recursive: true });
    await writeFile(fullPath, fileBuffer);

    const normalizedKey = fileKey.replace(/\\/g, '/');
    
    return {
      fileKey,
      fileUrl: `${this.baseUrl}/${normalizedKey}`,
      originalName,
      mimeType,
      sizeInBytes: size,
      provider: 'local',
    };
  }

  async delete(fileKey: string): Promise<void> {
    const fullPath = join(process.cwd(), this.uploadDir, fileKey);
    try {
      await unlink(fullPath);
    } catch {
      console.warn(`[Local Storage] Gagal menghapus file ${fileKey}. Mungkin sudah terhapus.`);
    }
  }
}

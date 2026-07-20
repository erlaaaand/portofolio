import { getDbConnection } from '../../../database/config';
import { StoredFileEntity, FilePurpose } from '../../domains/entities/stored-file.entity';
import { getStorageAdapter } from '../../infrastructures/providers/storage-adapter.provider';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export class UploadFileUseCase {
  async execute(file: File, purpose: FilePurpose, userId?: string) {
    const maxSize = parseInt(process.env.UPLOAD_MAX_SIZE || '10485760');
    if (file.size > maxSize) throw new Error('File melebihi batas ukuran.');

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = extname(file.name).toLowerCase();
    
    let contextPath = 'others';
    if (purpose === FilePurpose.PROJECT) contextPath = process.env.UPLOAD_PROJECT_PATH || 'projects';
    if (purpose === FilePurpose.BLOG) contextPath = process.env.UPLOAD_BLOG_PATH || 'blogs';
    if (purpose === FilePurpose.AVATAR) contextPath = process.env.UPLOAD_AVATAR_PATH || 'avatars';

    const uniqueId = uuidv4().replace(/-/g, '').substring(0, 8);
    const fileKey = `${contextPath}/${uniqueId}${ext}`;

    // ── Factory Action: Dapatkan adapter yang sesuai dari ENV ──
    const adapter = getStorageAdapter();
    const result = await adapter.upload(buffer, fileKey, file.name, file.type, file.size);

    // ── Simpan ke Database ──
    const db = await getDbConnection();
    const repo = db.getRepository(StoredFileEntity);
    
    const entity = repo.create({
      userId,
      fileKey: result.fileKey,
      fileUrl: result.fileUrl,
      originalName: result.originalName,
      mimeType: result.mimeType,
      sizeInBytes: result.sizeInBytes,
      provider: result.provider,
      purpose,
    });

    return await repo.save(entity);
  }
}

export const uploadFileUseCase = new UploadFileUseCase();
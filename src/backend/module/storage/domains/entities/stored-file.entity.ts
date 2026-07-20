import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';

export enum FilePurpose {
  AVATAR = 'AVATAR',
  PROJECT = 'PROJECT',
  BLOG = 'BLOG',
  OTHER = 'OTHER',
}

@Entity({ name: 'stored_files' })
export class StoredFileEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', length: 36, nullable: true })
  userId?: string;

  @Column({ name: 'file_key', type: 'varchar', length: 512 })
  fileKey!: string;

  @Column({ name: 'file_url', type: 'varchar', length: 512 })
  fileUrl!: string;

  @Column({ name: 'original_name', type: 'varchar', length: 255 })
  originalName!: string;

  @Column({ name: 'mime_type', type: 'varchar', length: 100 })
  mimeType!: string;

  @Column({ name: 'size_in_bytes', type: 'int', unsigned: true })
  sizeInBytes!: number;

  @Column({ type: 'enum', enum: FilePurpose, default: FilePurpose.OTHER })
  purpose!: FilePurpose;

  @Column({ type: 'varchar', length: 20, default: 'local' })
  provider!: string;
}
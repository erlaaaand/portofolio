import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { IStorageAdapter, UploadResult } from './storage.adapter.interface';

export class S3StorageAdapter implements IStorageAdapter {
  private client: S3Client;
  private bucket: string;
  private region: string;
  private endpoint: string | undefined;

  constructor() {
    this.region = process.env.AWS_REGION || 'ap-southeast-1';
    this.bucket = process.env.AWS_BUCKET || '';
    this.endpoint = process.env.AWS_ENDPOINT;

    this.client = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async upload(fileBuffer: Buffer, fileKey: string, originalName: string, mimeType: string, size: number): Promise<UploadResult> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: mimeType,
      ContentLength: size,
      Metadata: { originalName: encodeURIComponent(originalName) },
    });

    await this.client.send(command);

    // Membangun URL publik (Sesuaikan jika Anda menggunakan CloudFront atau aturan Supabase public URL)
    let fileUrl = '';
    if (this.endpoint && this.endpoint.includes('supabase.co')) {
      // Format public URL Supabase
      const supabaseUrl = process.env.SUPABASE_URL;
      fileUrl = `${supabaseUrl}/storage/v1/object/public/${this.bucket}/${fileKey}`;
    } else {
      // Format standar S3
      fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileKey}`;
    }

    return {
      fileKey,
      fileUrl,
      originalName,
      mimeType,
      sizeInBytes: size,
      provider: 's3',
    };
  }

  async delete(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });
    
    try {
      await this.client.send(command);
    } catch {
      console.warn(`[S3 Storage] Gagal menghapus file ${fileKey}.`);
    }
  }
}

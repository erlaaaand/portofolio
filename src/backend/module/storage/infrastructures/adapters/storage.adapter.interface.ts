export interface UploadResult {
  fileKey: string;
  fileUrl: string;
  originalName: string;
  mimeType: string;
  sizeInBytes: number;
  provider: string;
}

export interface IStorageAdapter {
  upload(
    fileBuffer: Buffer,
    fileKey: string,
    originalName: string,
    mimeType: string,
    size: number
  ): Promise<UploadResult>;
  
  delete(fileKey: string): Promise<void>;
}

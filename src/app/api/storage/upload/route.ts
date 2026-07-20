import { NextRequest, NextResponse } from 'next/server';
import { uploadFileUseCase } from '@/src/backend/module/storage/applications/use-cases/upload-file.use-case';
import { FilePurpose } from '@/src/backend/module/storage/domains/entities/stored-file.entity';
import { DomainError } from '@/src/backend/core/exceptions';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const secretKey = process.env.ADMIN_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: 'Konfigurasi server tidak lengkap. Keamanan API tidak dapat dipastikan.' },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json(
        { error: 'Akses ditolak. Kunci otorisasi tidak valid atau tidak ditemukan.' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    
    const fileEntry = formData.get('file');
    const file = fileEntry instanceof File ? fileEntry : null;
    
    const purposeEntry = formData.get('purpose');
    const isValidPurpose = typeof purposeEntry === 'string' && Object.values(FilePurpose).includes(purposeEntry as FilePurpose);
    const purpose = isValidPurpose ? (purposeEntry as FilePurpose) : FilePurpose.OTHER;
    
    const userIdEntry = formData.get('userId');
    const userId = typeof userIdEntry === 'string' ? userIdEntry : undefined;

    if (!file) {
      return NextResponse.json(
        { statusCode: 422, message: 'File tidak ditemukan dalam request atau format tidak sesuai.', module: 'storage' },
        { status: 422 }
      );
    }

    const savedFile = await uploadFileUseCase.execute(file, purpose, userId);

    return NextResponse.json(
      {
        message: 'File berhasil diunggah',
        data: {
          storedFileId: savedFile.id,
          fileKey: savedFile.fileKey,
          fileUrl: savedFile.fileUrl,
          purpose: savedFile.purpose
        }
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { 
          statusCode: error.statusCode, 
          message: error.message,
          module: 'storage'
        },
        { status: error.statusCode }
      );
    }

    console.error('Storage Upload Error:', error);
    return NextResponse.json(
      { 
        statusCode: 500, 
        message: 'Terjadi kesalahan internal pada server.',
        module: 'storage'
      },
      { status: 500 }
    );
  }
}

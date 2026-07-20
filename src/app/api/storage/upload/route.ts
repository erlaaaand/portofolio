import { NextRequest, NextResponse } from 'next/server';
import { uploadFileUseCase } from '../../../../backend/module/storage/applications/use-cases/upload-file.use-case';
import { FilePurpose } from '../../../../backend/module/storage/domains/entities/stored-file.entity';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const purpose = (formData.get('purpose') as FilePurpose) || FilePurpose.OTHER;
    const userId = formData.get('userId') as string | undefined;

    if (!file) {
      return NextResponse.json(
        { statusCode: 422, message: 'File tidak ditemukan dalam request.', module: 'storage' },
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

    let errorMessage = 'Terjadi kesalahan pada server.';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    const isPayloadTooLarge = errorMessage.includes('batas ukuran');
    
    return NextResponse.json(
      { 
        statusCode: isPayloadTooLarge ? 413 : 500, 
        message: errorMessage,
        module: 'storage'
      },
      { status: isPayloadTooLarge ? 413 : 500 }
    );
  }
}
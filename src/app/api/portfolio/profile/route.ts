import { NextRequest, NextResponse } from 'next/server';
import { getProfileUseCase, upsertProfileUseCase } from '@/src/backend/module/portfolio/applications/use-cases';
import { withExceptionFilter } from '@/src/backend/core/filters';

async function getHandler(request: NextRequest) {
  const data = await getProfileUseCase.execute();
  return NextResponse.json({ data }, { status: 200 });
}

async function postHandler(request: NextRequest) {
  const body = await request.json();
  const data = await upsertProfileUseCase.execute(body);
  
  return NextResponse.json({ data, message: 'Profile berhasil disimpan' }, { status: 200 });
}

export const GET = withExceptionFilter(getHandler);
export const POST = withExceptionFilter(postHandler);

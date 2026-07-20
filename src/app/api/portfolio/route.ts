import { NextRequest, NextResponse } from 'next/server';
import { createProjectUseCase, updateProjectUseCase, deleteProjectUseCase } from '@/src/backend/module/portfolio/applications/use-cases';
import { projectRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ProjectMapper } from '@/src/backend/module/portfolio/domains/mappers';
import { withExceptionFilter } from '@/src/backend/core/filters';

// GET: Ambil semua portfolio
async function getHandler(request: NextRequest) {
  const projects = await projectRepository.findAll();
  const data = projects.map(ProjectMapper.toResponseDto);
  
  return NextResponse.json({ data }, { status: 200 });
}

// POST: Buat portfolio baru
async function postHandler(request: NextRequest) {
  const body = await request.json();
  const data = await createProjectUseCase.execute(body);
  
  return NextResponse.json({ data, message: 'Project berhasil dibuat' }, { status: 201 });
}

// PUT: Update portfolio
async function putHandler(request: NextRequest) {
  const body = await request.json();
  const data = await updateProjectUseCase.execute(body);
  
  return NextResponse.json({ data, message: 'Project berhasil diupdate' }, { status: 200 });
}

// DELETE: Hapus portfolio
async function deleteHandler(request: NextRequest) {
  // Misal ID dikirim melalui URL parameter atau body
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const isHardDelete = searchParams.get('hardDelete') === 'true';

  if (!id) {
    return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
  }

  await deleteProjectUseCase.execute({ id, isHardDelete });
  
  return NextResponse.json({ message: 'Project berhasil dihapus' }, { status: 200 });
}

export const GET = withExceptionFilter(getHandler);
export const POST = withExceptionFilter(postHandler);
export const PUT = withExceptionFilter(putHandler);
export const DELETE = withExceptionFilter(deleteHandler);

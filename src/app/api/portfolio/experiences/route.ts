import { NextRequest, NextResponse } from 'next/server';
import { createExperienceUseCase, updateExperienceUseCase, deleteExperienceUseCase } from '@/src/backend/module/portfolio/applications/use-cases';
import { experienceRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ExperienceMapper } from '@/src/backend/module/portfolio/domains/mappers';
import { withExceptionFilter } from '@/src/backend/core/filters';

async function getHandler(request: NextRequest) {
  const experiences = await experienceRepository.findAll();
  const data = experiences.map(ExperienceMapper.toResponseDto);
  return NextResponse.json({ data }, { status: 200 });
}

async function postHandler(request: NextRequest) {
  const body = await request.json();
  const data = await createExperienceUseCase.execute(body);
  return NextResponse.json({ data, message: 'Riwayat berhasil ditambahkan' }, { status: 201 });
}

async function putHandler(request: NextRequest) {
  const body = await request.json();
  const data = await updateExperienceUseCase.execute(body);
  return NextResponse.json({ data, message: 'Riwayat berhasil diperbarui' }, { status: 200 });
}

async function deleteHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
  }

  await deleteExperienceUseCase.execute(id);
  return NextResponse.json({ message: 'Riwayat berhasil dihapus' }, { status: 200 });
}

export const GET = withExceptionFilter(getHandler);
export const POST = withExceptionFilter(postHandler);
export const PUT = withExceptionFilter(putHandler);
export const DELETE = withExceptionFilter(deleteHandler);

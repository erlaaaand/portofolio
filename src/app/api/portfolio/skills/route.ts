import { NextRequest, NextResponse } from 'next/server';
import { createSkillUseCase, updateSkillUseCase, deleteSkillUseCase } from '@/src/backend/module/portfolio/applications/use-cases';
import { skillRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { SkillMapper } from '@/src/backend/module/portfolio/domains/mappers';
import { withExceptionFilter } from '@/src/backend/core/filters';

async function getHandler(request: NextRequest) {
  const skills = await skillRepository.findAll();
  const data = skills.map(SkillMapper.toResponseDto);
  return NextResponse.json({ data }, { status: 200 });
}

async function postHandler(request: NextRequest) {
  const body = await request.json();
  const data = await createSkillUseCase.execute(body);
  return NextResponse.json({ data, message: 'Skill berhasil dibuat' }, { status: 201 });
}

async function putHandler(request: NextRequest) {
  const body = await request.json();
  const data = await updateSkillUseCase.execute(body);
  return NextResponse.json({ data, message: 'Skill berhasil diupdate' }, { status: 200 });
}

async function deleteHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
  }

  await deleteSkillUseCase.execute(id);
  return NextResponse.json({ message: 'Skill berhasil dihapus' }, { status: 200 });
}

export const GET = withExceptionFilter(getHandler);
export const POST = withExceptionFilter(postHandler);
export const PUT = withExceptionFilter(putHandler);
export const DELETE = withExceptionFilter(deleteHandler);

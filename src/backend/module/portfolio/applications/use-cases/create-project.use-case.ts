import { ValidationError } from '@/src/backend/core/exceptions';
import { CreateProjectDto, ProjectResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { projectRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ProjectMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class CreateProjectUseCase {
  async execute(dto: CreateProjectDto): Promise<ProjectResponseDto> {
    if (!dto.title || dto.title.trim() === '') {
      throw new ValidationError('Judul project tidak boleh kosong.');
    }

    if (!dto.description || dto.description.trim() === '') {
      throw new ValidationError('Deskripsi project tidak boleh kosong.');
    }

    const project = await projectRepository.create(dto);
    
    return ProjectMapper.toResponseDto(project);
  }
}

export const createProjectUseCase = new CreateProjectUseCase();

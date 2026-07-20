import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { UpdateProjectDto, ProjectResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { projectRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ProjectMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class UpdateProjectUseCase {
  async execute(dto: UpdateProjectDto): Promise<ProjectResponseDto> {
    if (!dto.id) {
      throw new ValidationError('ID project wajib disertakan untuk update.');
    }

    if (dto.title !== undefined && dto.title.trim() === '') {
      throw new ValidationError('Judul project tidak boleh kosong.');
    }

    if (dto.description !== undefined && dto.description.trim() === '') {
      throw new ValidationError('Deskripsi project tidak boleh kosong.');
    }

    const project = await projectRepository.findById(dto.id);
    if (!project) {
      throw new NotFoundError(`Project dengan ID ${dto.id} tidak ditemukan.`);
    }

    const updatedProject = await projectRepository.update(project, dto);

    return ProjectMapper.toResponseDto(updatedProject);
  }
}

export const updateProjectUseCase = new UpdateProjectUseCase();

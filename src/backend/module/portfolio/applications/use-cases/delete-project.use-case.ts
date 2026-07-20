import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { projectRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';

export interface DeleteProjectDto {
  id: string;
  isHardDelete?: boolean;
}

export class DeleteProjectUseCase {
  async execute(dto: DeleteProjectDto): Promise<void> {
    if (!dto.id) {
      throw new ValidationError('ID project wajib disertakan untuk penghapusan.');
    }

    const project = await projectRepository.findById(dto.id, true);
    
    if (!project) {
      throw new NotFoundError(`Project dengan ID ${dto.id} tidak ditemukan.`);
    }

    if (dto.isHardDelete) {
      await projectRepository.hardDelete(project);
    } else {
      await projectRepository.softDelete(project);
    }
  }
}

export const deleteProjectUseCase = new DeleteProjectUseCase();

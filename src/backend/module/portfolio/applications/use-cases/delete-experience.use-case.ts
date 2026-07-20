import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { experienceRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';

export class DeleteExperienceUseCase {
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new ValidationError('ID riwayat wajib disertakan.');
    }

    const experience = await experienceRepository.findById(id);
    if (!experience) {
      throw new NotFoundError(`Riwayat dengan ID ${id} tidak ditemukan.`);
    }

    await experienceRepository.delete(experience);
  }
}

export const deleteExperienceUseCase = new DeleteExperienceUseCase();

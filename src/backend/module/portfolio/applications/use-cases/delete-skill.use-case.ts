import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { skillRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';

export class DeleteSkillUseCase {
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new ValidationError('ID skill wajib disertakan.');
    }

    const skill = await skillRepository.findById(id);
    if (!skill) {
      throw new NotFoundError(`Skill dengan ID ${id} tidak ditemukan.`);
    }

    await skillRepository.delete(skill);
  }
}

export const deleteSkillUseCase = new DeleteSkillUseCase();

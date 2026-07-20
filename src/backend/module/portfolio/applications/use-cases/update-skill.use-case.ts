import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { UpdateSkillDto, SkillResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { skillRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { SkillMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class UpdateSkillUseCase {
  async execute(dto: UpdateSkillDto): Promise<SkillResponseDto> {
    if (!dto.id) {
      throw new ValidationError('ID skill wajib disertakan.');
    }
    
    if (dto.name !== undefined && dto.name.trim() === '') {
      throw new ValidationError('Nama skill tidak boleh kosong.');
    }

    const skill = await skillRepository.findById(dto.id);
    if (!skill) {
      throw new NotFoundError(`Skill dengan ID ${dto.id} tidak ditemukan.`);
    }

    const updatedSkill = await skillRepository.update(skill, dto);
    return SkillMapper.toResponseDto(updatedSkill);
  }
}

export const updateSkillUseCase = new UpdateSkillUseCase();

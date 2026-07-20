import { ValidationError } from '@/src/backend/core/exceptions';
import { CreateSkillDto, SkillResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { skillRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { SkillMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class CreateSkillUseCase {
  async execute(dto: CreateSkillDto): Promise<SkillResponseDto> {
    if (!dto.name || dto.name.trim() === '') {
      throw new ValidationError('Nama skill tidak boleh kosong.');
    }

    const skill = await skillRepository.create(dto);
    return SkillMapper.toResponseDto(skill);
  }
}

export const createSkillUseCase = new CreateSkillUseCase();

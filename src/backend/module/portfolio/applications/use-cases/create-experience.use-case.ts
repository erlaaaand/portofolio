import { ValidationError } from '@/src/backend/core/exceptions';
import { CreateExperienceDto, ExperienceResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { experienceRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ExperienceMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class CreateExperienceUseCase {
  async execute(dto: CreateExperienceDto): Promise<ExperienceResponseDto> {
    if (!dto.title || dto.title.trim() === '') {
      throw new ValidationError('Posisi atau Gelar tidak boleh kosong.');
    }
    if (!dto.institution || dto.institution.trim() === '') {
      throw new ValidationError('Nama institusi tidak boleh kosong.');
    }
    if (!dto.startDate) {
      throw new ValidationError('Tanggal mulai wajib disertakan.');
    }

    const experience = await experienceRepository.create(dto);
    return ExperienceMapper.toResponseDto(experience);
  }
}

export const createExperienceUseCase = new CreateExperienceUseCase();

import { NotFoundError, ValidationError } from '@/src/backend/core/exceptions';
import { UpdateExperienceDto, ExperienceResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { experienceRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ExperienceMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class UpdateExperienceUseCase {
  async execute(dto: UpdateExperienceDto): Promise<ExperienceResponseDto> {
    if (!dto.id) {
      throw new ValidationError('ID riwayat wajib disertakan.');
    }
    
    if (dto.title !== undefined && dto.title.trim() === '') {
      throw new ValidationError('Posisi atau Gelar tidak boleh kosong.');
    }

    if (dto.institution !== undefined && dto.institution.trim() === '') {
      throw new ValidationError('Nama institusi tidak boleh kosong.');
    }

    const experience = await experienceRepository.findById(dto.id);
    if (!experience) {
      throw new NotFoundError(`Riwayat dengan ID ${dto.id} tidak ditemukan.`);
    }

    const updatedExperience = await experienceRepository.update(experience, dto);
    return ExperienceMapper.toResponseDto(updatedExperience);
  }
}

export const updateExperienceUseCase = new UpdateExperienceUseCase();

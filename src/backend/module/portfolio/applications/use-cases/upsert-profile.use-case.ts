import { ValidationError } from '@/src/backend/core/exceptions';
import { UpsertProfileDto, ProfileResponseDto } from '@/src/backend/module/portfolio/applications/dto';
import { profileRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ProfileMapper } from '@/src/backend/module/portfolio/domains/mappers';

export class UpsertProfileUseCase {
  async execute(dto: UpsertProfileDto): Promise<ProfileResponseDto> {
    if (!dto.fullName || dto.fullName.trim() === '') {
      throw new ValidationError('Nama lengkap tidak boleh kosong.');
    }
    
    if (!dto.headline || dto.headline.trim() === '') {
      throw new ValidationError('Headline tidak boleh kosong.');
    }

    if (!dto.bio || dto.bio.trim() === '') {
      throw new ValidationError('Bio tidak boleh kosong.');
    }

    const profile = await profileRepository.upsert(dto);
    return ProfileMapper.toResponseDto(profile);
  }
}

export const upsertProfileUseCase = new UpsertProfileUseCase();

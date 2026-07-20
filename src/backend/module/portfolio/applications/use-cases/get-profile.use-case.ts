import { profileRepository } from '@/src/backend/module/portfolio/infrastructures/repositories';
import { ProfileMapper } from '@/src/backend/module/portfolio/domains/mappers';
import { ProfileResponseDto } from '@/src/backend/module/portfolio/applications/dto';

export class GetProfileUseCase {
  async execute(): Promise<ProfileResponseDto | null> {
    const profile = await profileRepository.getProfile();
    if (!profile) return null;
    
    return ProfileMapper.toResponseDto(profile);
  }
}

export const getProfileUseCase = new GetProfileUseCase();

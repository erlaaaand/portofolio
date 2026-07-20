import { ProfileEntity } from '@/src/backend/module/portfolio/domains/entities';
import { ProfileResponseDto } from '@/src/backend/module/portfolio/applications/dto';

export class ProfileMapper {
  static toResponseDto(entity: ProfileEntity): ProfileResponseDto {
    return {
      id: entity.id,
      fullName: entity.fullName,
      headline: entity.headline,
      bio: entity.bio,
      avatarUrl: entity.avatarUrl,
      resumeUrl: entity.resumeUrl,
      githubUrl: entity.githubUrl,
      linkedinUrl: entity.linkedinUrl,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

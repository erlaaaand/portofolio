import { ExperienceEntity } from '@/src/backend/module/portfolio/domains/entities';
import { ExperienceResponseDto } from '@/src/backend/module/portfolio/applications/dto';

export class ExperienceMapper {
  static toResponseDto(entity: ExperienceEntity): ExperienceResponseDto {
    return {
      id: entity.id,
      type: entity.type,
      title: entity.title,
      institution: entity.institution,
      startDate: entity.startDate,
      endDate: entity.endDate,
      isCurrent: entity.isCurrent,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

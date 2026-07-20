import { SkillEntity } from '@/src/backend/module/portfolio/domains/entities';
import { SkillResponseDto } from '@/src/backend/module/portfolio/applications/dto';

export class SkillMapper {
  static toResponseDto(entity: SkillEntity): SkillResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      proficiency: entity.proficiency,
      iconUrl: entity.iconUrl,
      orderIndex: entity.orderIndex,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

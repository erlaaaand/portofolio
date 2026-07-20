import { ProjectEntity } from '@/src/backend/module/portfolio/domains/entities';
import { ProjectResponseDto } from '@/src/backend/module/portfolio/applications/dto';

export class ProjectMapper {
  static toResponseDto(entity: ProjectEntity): ProjectResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      thumbnailUrl: entity.thumbnailUrl,
      githubUrl: entity.githubUrl,
      liveUrl: entity.liveUrl,
      isPublished: entity.isPublished,
      techStack: entity.techStack || [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

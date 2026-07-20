export class ProjectResponseDto {
  id!: string;
  title!: string;
  description!: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  isPublished!: boolean;
  techStack!: string[];
  createdAt!: Date;
  updatedAt!: Date;
}

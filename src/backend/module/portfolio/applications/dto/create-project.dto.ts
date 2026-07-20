export class CreateProjectDto {
  title!: string;
  description!: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  isPublished?: boolean;
  techStack?: string[];
}

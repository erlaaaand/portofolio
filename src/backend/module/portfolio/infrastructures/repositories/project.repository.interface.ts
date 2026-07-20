import { ProjectEntity } from '@/src/backend/module/portfolio/domains/entities';
import { CreateProjectDto, UpdateProjectDto } from '@/src/backend/module/portfolio/applications/dto';

export interface IProjectRepository {
  findById(id: string, withDeleted?: boolean): Promise<ProjectEntity | null>;
  findAll(): Promise<ProjectEntity[]>;
  create(data: CreateProjectDto): Promise<ProjectEntity>;
  update(project: ProjectEntity, data: Partial<UpdateProjectDto>): Promise<ProjectEntity>;
  softDelete(project: ProjectEntity): Promise<void>;
  hardDelete(project: ProjectEntity): Promise<void>;
}

import { getDbConnection } from '@/src/backend/module/database/config';
import { ProjectEntity } from '@/src/backend/module/portfolio/domains/entities';
import { IProjectRepository } from './project.repository.interface';
import { CreateProjectDto, UpdateProjectDto } from '@/src/backend/module/portfolio/applications/dto';

export class ProjectRepository implements IProjectRepository {
  private async getRepo() {
    const db = await getDbConnection();
    return db.getRepository(ProjectEntity);
  }

  async findById(id: string, withDeleted: boolean = false): Promise<ProjectEntity | null> {
    const repo = await this.getRepo();
    return repo.findOne({ where: { id }, withDeleted });
  }

  async findAll(): Promise<ProjectEntity[]> {
    const repo = await this.getRepo();
    return repo.find({ order: { createdAt: 'DESC' } });
  }

  async create(data: CreateProjectDto): Promise<ProjectEntity> {
    const repo = await this.getRepo();
    const project = repo.create({
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      isPublished: data.isPublished ?? true,
      techStack: data.techStack || [],
    });
    return repo.save(project);
  }

  async update(project: ProjectEntity, data: Partial<UpdateProjectDto>): Promise<ProjectEntity> {
    const repo = await this.getRepo();
    if (data.title !== undefined) project.title = data.title;
    if (data.description !== undefined) project.description = data.description;
    if (data.thumbnailUrl !== undefined) project.thumbnailUrl = data.thumbnailUrl;
    if (data.githubUrl !== undefined) project.githubUrl = data.githubUrl;
    if (data.liveUrl !== undefined) project.liveUrl = data.liveUrl;
    if (data.isPublished !== undefined) project.isPublished = data.isPublished;
    if (data.techStack !== undefined) project.techStack = data.techStack;
    
    return repo.save(project);
  }

  async softDelete(project: ProjectEntity): Promise<void> {
    const repo = await this.getRepo();
    await repo.softRemove(project);
  }

  async hardDelete(project: ProjectEntity): Promise<void> {
    const repo = await this.getRepo();
    await repo.remove(project);
  }
}

export const projectRepository = new ProjectRepository();

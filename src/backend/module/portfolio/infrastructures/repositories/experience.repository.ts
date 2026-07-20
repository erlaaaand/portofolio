import { getDbConnection } from '@/src/backend/module/database/config';
import { ExperienceEntity } from '@/src/backend/module/portfolio/domains/entities';
import { IExperienceRepository } from './experience.repository.interface';
import { CreateExperienceDto, UpdateExperienceDto } from '@/src/backend/module/portfolio/applications/dto';

export class ExperienceRepository implements IExperienceRepository {
  private async getRepo() {
    const db = await getDbConnection();
    return db.getRepository(ExperienceEntity);
  }

  async findById(id: string): Promise<ExperienceEntity | null> {
    const repo = await this.getRepo();
    return repo.findOne({ where: { id } });
  }

  async findAll(): Promise<ExperienceEntity[]> {
    const repo = await this.getRepo();
    return repo.find({ order: { startDate: 'DESC' } });
  }

  async create(data: CreateExperienceDto): Promise<ExperienceEntity> {
    const repo = await this.getRepo();
    const experience = repo.create({
      type: data.type,
      title: data.title,
      institution: data.institution,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      isCurrent: data.isCurrent ?? false,
      description: data.description,
    });
    return repo.save(experience);
  }

  async update(experience: ExperienceEntity, data: Partial<UpdateExperienceDto>): Promise<ExperienceEntity> {
    const repo = await this.getRepo();
    if (data.type !== undefined) experience.type = data.type;
    if (data.title !== undefined) experience.title = data.title;
    if (data.institution !== undefined) experience.institution = data.institution;
    if (data.startDate !== undefined) experience.startDate = new Date(data.startDate);
    
    if (data.endDate !== undefined) {
      experience.endDate = data.endDate ? new Date(data.endDate) : undefined;
    }
    
    if (data.isCurrent !== undefined) experience.isCurrent = data.isCurrent;
    if (data.description !== undefined) experience.description = data.description;

    return repo.save(experience);
  }

  async delete(experience: ExperienceEntity): Promise<void> {
    const repo = await this.getRepo();
    await repo.remove(experience);
  }
}

export const experienceRepository = new ExperienceRepository();

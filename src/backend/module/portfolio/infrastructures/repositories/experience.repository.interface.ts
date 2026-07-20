import { ExperienceEntity } from '@/src/backend/module/portfolio/domains/entities';
import { CreateExperienceDto, UpdateExperienceDto } from '@/src/backend/module/portfolio/applications/dto';

export interface IExperienceRepository {
  findById(id: string): Promise<ExperienceEntity | null>;
  findAll(): Promise<ExperienceEntity[]>;
  create(data: CreateExperienceDto): Promise<ExperienceEntity>;
  update(experience: ExperienceEntity, data: Partial<UpdateExperienceDto>): Promise<ExperienceEntity>;
  delete(experience: ExperienceEntity): Promise<void>;
}

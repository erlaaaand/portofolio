import { SkillEntity } from '@/src/backend/module/portfolio/domains/entities';
import { CreateSkillDto, UpdateSkillDto } from '@/src/backend/module/portfolio/applications/dto';

export interface ISkillRepository {
  findById(id: string): Promise<SkillEntity | null>;
  findAll(): Promise<SkillEntity[]>;
  create(data: CreateSkillDto): Promise<SkillEntity>;
  update(skill: SkillEntity, data: Partial<UpdateSkillDto>): Promise<SkillEntity>;
  delete(skill: SkillEntity): Promise<void>;
}

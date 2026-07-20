import { getDbConnection } from '@/src/backend/module/database/config';
import { SkillEntity } from '@/src/backend/module/portfolio/domains/entities';
import { ISkillRepository } from './skill.repository.interface';
import { CreateSkillDto, UpdateSkillDto } from '@/src/backend/module/portfolio/applications/dto';

export class SkillRepository implements ISkillRepository {
  private async getRepo() {
    const db = await getDbConnection();
    return db.getRepository(SkillEntity);
  }

  async findById(id: string): Promise<SkillEntity | null> {
    const repo = await this.getRepo();
    return repo.findOne({ where: { id } });
  }

  async findAll(): Promise<SkillEntity[]> {
    const repo = await this.getRepo();
    return repo.find({ order: { orderIndex: 'ASC', createdAt: 'DESC' } });
  }

  async create(data: CreateSkillDto): Promise<SkillEntity> {
    const repo = await this.getRepo();
    const skill = repo.create({
      name: data.name,
      category: data.category,
      proficiency: data.proficiency,
      iconUrl: data.iconUrl,
      orderIndex: data.orderIndex ?? 0,
    });
    return repo.save(skill);
  }

  async update(skill: SkillEntity, data: Partial<UpdateSkillDto>): Promise<SkillEntity> {
    const repo = await this.getRepo();
    if (data.name !== undefined) skill.name = data.name;
    if (data.category !== undefined) skill.category = data.category;
    if (data.proficiency !== undefined) skill.proficiency = data.proficiency;
    if (data.iconUrl !== undefined) skill.iconUrl = data.iconUrl;
    if (data.orderIndex !== undefined) skill.orderIndex = data.orderIndex;

    return repo.save(skill);
  }

  async delete(skill: SkillEntity): Promise<void> {
    const repo = await this.getRepo();
    await repo.remove(skill);
  }
}

export const skillRepository = new SkillRepository();

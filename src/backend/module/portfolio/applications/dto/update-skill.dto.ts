import { SkillCategory } from '@/src/backend/module/portfolio/domains/entities';

export class UpdateSkillDto {
  id!: string;
  name?: string;
  category?: SkillCategory;
  proficiency?: number;
  iconUrl?: string;
  orderIndex?: number;
}

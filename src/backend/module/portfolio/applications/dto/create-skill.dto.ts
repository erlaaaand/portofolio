import { SkillCategory } from '@/src/backend/module/portfolio/domains/entities';

export class CreateSkillDto {
  name!: string;
  category?: SkillCategory;
  proficiency?: number;
  iconUrl?: string;
  orderIndex?: number;
}

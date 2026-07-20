import { SkillCategory } from '@/src/backend/module/portfolio/domains/entities';

export class SkillResponseDto {
  id!: string;
  name!: string;
  category!: SkillCategory;
  proficiency?: number;
  iconUrl?: string;
  orderIndex!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

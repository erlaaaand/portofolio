import { ExperienceType } from '@/src/backend/module/portfolio/domains/entities';

export class UpdateExperienceDto {
  id!: string;
  type?: ExperienceType;
  title?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

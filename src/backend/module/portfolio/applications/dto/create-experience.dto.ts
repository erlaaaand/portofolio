import { ExperienceType } from '@/src/backend/module/portfolio/domains/entities';

export class CreateExperienceDto {
  type!: ExperienceType;
  title!: string;
  institution!: string;
  startDate!: string; // Using string ISO date from frontend
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

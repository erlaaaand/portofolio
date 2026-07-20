import { ExperienceType } from '@/src/backend/module/portfolio/domains/entities';

export class ExperienceResponseDto {
  id!: string;
  type!: ExperienceType;
  title!: string;
  institution!: string;
  startDate!: Date;
  endDate?: Date;
  isCurrent!: boolean;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

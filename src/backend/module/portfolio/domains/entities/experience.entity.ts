import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/backend/module/database/entities';

export enum ExperienceType {
  WORK = 'WORK',
  EDUCATION = 'EDUCATION'
}

@Entity({ name: 'experiences' })
export class ExperienceEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ExperienceType })
  type!: ExperienceType;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  institution!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @Column({ name: 'is_current', type: 'boolean', default: false })
  isCurrent!: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;
}

import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/backend/module/database/entities';

export enum SkillCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DEVOPS = 'DEVOPS',
  TOOLS = 'TOOLS',
  OTHER = 'OTHER'
}

@Entity({ name: 'skills' })
export class SkillEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'enum', enum: SkillCategory, default: SkillCategory.OTHER })
  category!: SkillCategory;

  @Column({ type: 'int', nullable: true })
  proficiency?: number;

  @Column({ name: 'icon_url', type: 'varchar', length: 512, nullable: true })
  iconUrl?: string;

  @Column({ name: 'order_index', type: 'int', default: 0 })
  orderIndex!: number;
}

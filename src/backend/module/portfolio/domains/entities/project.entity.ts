import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/backend/module/database/entities';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'thumbnail_url', type: 'varchar', length: 512, nullable: true })
  thumbnailUrl?: string;

  @Column({ name: 'github_url', type: 'varchar', length: 512, nullable: true })
  githubUrl?: string;

  @Column({ name: 'live_url', type: 'varchar', length: 512, nullable: true })
  liveUrl?: string;

  @Column({ name: 'is_published', type: 'boolean', default: true })
  isPublished!: boolean;

  @Column({ name: 'tech_stack', type: 'json', nullable: true })
  techStack?: string[];
}

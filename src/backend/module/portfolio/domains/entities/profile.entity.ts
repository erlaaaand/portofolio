import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/backend/module/database/entities';

@Entity({ name: 'profiles' })
export class ProfileEntity extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ type: 'varchar', length: 255 })
  headline!: string;

  @Column({ type: 'text' })
  bio!: string;

  @Column({ name: 'avatar_url', type: 'varchar', length: 512, nullable: true })
  avatarUrl?: string;

  @Column({ name: 'resume_url', type: 'varchar', length: 512, nullable: true })
  resumeUrl?: string;

  @Column({ name: 'github_url', type: 'varchar', length: 512, nullable: true })
  githubUrl?: string;

  @Column({ name: 'linkedin_url', type: 'varchar', length: 512, nullable: true })
  linkedinUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;
}

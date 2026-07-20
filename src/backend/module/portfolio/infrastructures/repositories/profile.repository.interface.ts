import { ProfileEntity } from '@/src/backend/module/portfolio/domains/entities';
import { UpsertProfileDto } from '@/src/backend/module/portfolio/applications/dto';

export interface IProfileRepository {
  getProfile(): Promise<ProfileEntity | null>;
  upsert(data: UpsertProfileDto): Promise<ProfileEntity>;
}

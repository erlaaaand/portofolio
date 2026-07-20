import { getDbConnection } from '@/src/backend/module/database/config';
import { ProfileEntity } from '@/src/backend/module/portfolio/domains/entities';
import { IProfileRepository } from './profile.repository.interface';
import { UpsertProfileDto } from '@/src/backend/module/portfolio/applications/dto';

export class ProfileRepository implements IProfileRepository {
  private async getRepo() {
    const db = await getDbConnection();
    return db.getRepository(ProfileEntity);
  }

  async getProfile(): Promise<ProfileEntity | null> {
    const repo = await this.getRepo();
    // Assuming only one profile is active for the portfolio
    return repo.findOne({ order: { createdAt: 'DESC' }, where: {} });
  }

  async upsert(data: UpsertProfileDto): Promise<ProfileEntity> {
    const repo = await this.getRepo();
    let profile = await this.getProfile();

    if (!profile) {
      profile = repo.create();
    }

    profile.fullName = data.fullName;
    profile.headline = data.headline;
    profile.bio = data.bio;
    
    if (data.avatarUrl !== undefined) profile.avatarUrl = data.avatarUrl;
    if (data.resumeUrl !== undefined) profile.resumeUrl = data.resumeUrl;
    if (data.githubUrl !== undefined) profile.githubUrl = data.githubUrl;
    if (data.linkedinUrl !== undefined) profile.linkedinUrl = data.linkedinUrl;
    if (data.email !== undefined) profile.email = data.email;

    return repo.save(profile);
  }
}

export const profileRepository = new ProfileRepository();

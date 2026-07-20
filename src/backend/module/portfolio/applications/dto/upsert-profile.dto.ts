export class UpsertProfileDto {
  fullName!: string;
  headline!: string;
  bio!: string;
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

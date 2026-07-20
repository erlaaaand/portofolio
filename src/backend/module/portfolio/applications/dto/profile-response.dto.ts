export class ProfileResponseDto {
  id!: string;
  fullName!: string;
  headline!: string;
  bio!: string;
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

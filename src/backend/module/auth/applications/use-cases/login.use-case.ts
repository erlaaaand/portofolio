import { getDbConnection } from '@/src/backend/module/database/config';
import { UserEntity } from '@/src/backend/module/auth/domains/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ValidationError, UnauthorizedError } from '@/src/backend/core/exceptions';

export interface LoginDto {
  email?: string;
  password?: string;
}

export interface LoginResult {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  };
}

export class LoginUseCase {
  async execute(dto: LoginDto): Promise<LoginResult> {
    const { email, password } = dto;

    if (!email || !password) {
      throw new ValidationError('Email dan password wajib diisi');
    }

    const db = await getDbConnection();
    const userRepo = db.getRepository(UserEntity);

    // Tambahkan addSelect karena password disembunyikan (select: false) di entity
    const user = await userRepo.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedError('Kredensial tidak valid');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Kredensial tidak valid');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('Kunci rahasia JWT tidak dikonfigurasi pada environment.');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}

export const loginUseCase = new LoginUseCase();

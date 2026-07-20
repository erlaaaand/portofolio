import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginUseCase } from '@/src/backend/module/auth/applications/use-cases/login.use-case';
import { DomainError } from '@/src/backend/core/exceptions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const result = await loginUseCase.execute({ email, password });

    const cookieStore = await cookies();
    cookieStore.set('accessToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 Hari dalam detik
    });

    return NextResponse.json({
      message: 'Login berhasil',
      user: result.user
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
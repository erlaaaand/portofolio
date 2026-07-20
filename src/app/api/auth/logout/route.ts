import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  // Hapus cookie dengan mengatur maxAge ke 0
  cookieStore.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 0, 
  });

  return NextResponse.json({ message: 'Logout berhasil' }, { status: 200 });
}

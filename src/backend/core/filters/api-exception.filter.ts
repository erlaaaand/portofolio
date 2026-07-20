import { NextResponse } from 'next/server';
import { DomainError } from '@/src/backend/core/exceptions';

/**
 * Higher-Order Function to wrap Next.js Route Handlers.
 * Acts like a Global Exception Filter in NestJS.
 */
export function withExceptionFilter<T extends unknown[], R>(handler: (...args: T) => Promise<R>) {
  return async (...args: T): Promise<R | NextResponse> => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        return NextResponse.json(
          {
            error: error.message,
            statusCode: error.statusCode,
          },
          { status: error.statusCode }
        );
      }

      console.error('Unhandled Exception:', error);
      return NextResponse.json(
        { error: 'Terjadi kesalahan internal pada server', statusCode: 500 },
        { status: 500 }
      );
    }
  };
}

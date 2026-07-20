export abstract class DomainError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string = 'Validasi gagal') {
    super(message, 400);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Kredensial tidak valid atau tidak memiliki akses') {
    super(message, 401);
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string = 'Resource tidak ditemukan') {
    super(message, 404);
  }
}

export class PayloadTooLargeError extends DomainError {
  constructor(message: string = 'Ukuran payload terlalu besar') {
    super(message, 413);
  }
}

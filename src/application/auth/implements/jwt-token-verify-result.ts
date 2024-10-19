import { TokenExpiredError } from '@nestjs/jwt';

import { JwtTokenPayload } from './interfaces';

export class JwtTokenVerifyResult {
  payload: JwtTokenPayload;
  error: unknown;
  expired: boolean;

  constructor(error?: unknown) {
    this.payload = null;
    this.error = error ?? null;
    this.expired = error instanceof TokenExpiredError;
  }

  setPayload(payload: JwtTokenPayload) {
    this.payload = payload;

    return this;
  }

  setError(error: unknown) {
    this.error = error;
    this.expired = error instanceof TokenExpiredError;

    return this;
  }
}

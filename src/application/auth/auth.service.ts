import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { verify } from 'argon2';
import { JwtPayload } from 'jsonwebtoken';

import { LoginDTO, TokensDTO } from './dtos';
import { InvalidAdminException, InvalidEmailOrPasswordException } from './exceptions';
import { AdminService } from '../admin';
import { JwtCustomPayload, JwtVerifyResult } from './implements';

import { JwtConfigFactory } from '@/common';
import { ContextService } from '@/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigFactory: JwtConfigFactory,
    private readonly contextService: ContextService,
  ) {}

  async login(body: LoginDTO) {
    const admin = await this.adminService.findByEmail(body.email);

    if (admin === null) {
      throw new InvalidEmailOrPasswordException();
    }

    if ((await verify(admin.password, body.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    const tokens = this.issueTokens(admin);

    return new TokensDTO(tokens.accessToken, tokens.refreshToken);
  }

  issueTokens(payload: JwtPayload) {
    return {
      accessToken: this.issueAccessToken(payload),
      refreshToken: this.issueRefreshToken(payload),
    };
  }

  issueAccessToken(payload: JwtPayload) {
    return this.jwtService.sign({ id: payload.id }, this.jwtConfigFactory.getAccessTokenSignOptions());
  }

  issueRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign({ id: payload.id }, this.jwtConfigFactory.getRefreshTokenSignOptions());
  }

  validateJwtPayload(payload: JwtCustomPayload) {
    if (typeof payload.id === 'number') {
      return payload;
    }

    throw new JsonWebTokenError('invalid jwt token payload');
  }

  verifyAccessToken(accessToken: string, error: unknown = null): JwtVerifyResult {
    const expired = error instanceof TokenExpiredError;
    const verifyResult = new JwtVerifyResult(error);

    if (error && expired === false) {
      return verifyResult;
    }

    const options = this.jwtConfigFactory.getAccessTokenVerifyOptions(verifyResult.expired);

    try {
      const payload = this.validateJwtPayload(this.jwtService.verify(accessToken, options));

      return verifyResult.setPayload(payload);
    } catch (e) {
      return this.verifyAccessToken(accessToken, e);
    }
  }

  verifyRefreshToken(refreshToken: string): JwtVerifyResult {
    const options = this.jwtConfigFactory.getRefreshTokenVerifyOptions();
    const verifyResult = new JwtVerifyResult();

    try {
      const payload = this.validateJwtPayload(this.jwtService.verify(refreshToken, options));

      return verifyResult.setPayload(payload);
    } catch (e) {
      return verifyResult.setError(e);
    }
  }

  async setRequestUserContext(id: number) {
    const admin = await this.adminService.findById(id);

    if (admin === null) {
      throw new InvalidAdminException();
    }

    this.contextService.setRequestUser(admin);
  }
}

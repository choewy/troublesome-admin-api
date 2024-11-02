import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { JwtVerifyResult } from './jwt-verify-result';

import { getEnv } from '@/constant';

@Injectable()
export class JwtService {
  private readonly issuer: string;
  private readonly accessTokenSecret: string;
  private readonly accessTokenSubject: string;
  private readonly refreshTokenSecret: string;
  private readonly refershTokenSubject: string;

  constructor(private readonly configService: ConfigService) {
    this.issuer = [this.configService.get('npm_package_name'), this.configService.get('npm_package_version'), getEnv()].join(':');
    this.accessTokenSecret = this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET');
    this.refreshTokenSecret = this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET');
    this.accessTokenSubject = [this.issuer, 'access'].join(':');
    this.refershTokenSubject = [this.issuer, 'refersh'].join(':');
  }

  issueAccessToken(payload: string | object | Buffer) {
    return this.issueToken(payload, this.accessTokenSecret, {
      issuer: this.issuer,
      subject: this.accessTokenSubject,
      expiresIn: '1d',
    });
  }

  issueRefreshToken(payload: string | object | Buffer) {
    return this.issueToken(payload, this.refreshTokenSecret, {
      issuer: this.issuer,
      subject: this.refershTokenSubject,
      expiresIn: '14d',
    });
  }

  verifyAccessToken(token: string) {
    const verifyResult = this.verifyToken(token, this.accessTokenSecret);

    if (verifyResult.expired) {
      return this.verifyToken(token, this.accessTokenSecret, { ignoreExpiration: true });
    }

    return verifyResult;
  }

  verifyRefreshToken(token: string) {
    return this.verifyToken(token, this.refreshTokenSecret);
  }

  private issueToken(payload: string | object | Buffer, secret: string, signOptions: jwt.SignOptions = {}) {
    return jwt.sign(payload, secret, signOptions);
  }

  private verifyToken<Payload extends jwt.JwtPayload>(token: string, secret: string, verifyOptions: jwt.VerifyOptions = {}) {
    const verifyResult = new JwtVerifyResult();

    try {
      verifyResult.payload = jwt.verify(token, secret, verifyOptions) as Payload;
      verifyResult.ok = true;
    } catch (e) {
      verifyResult.error = e;
      verifyResult.expired = e instanceof jwt.TokenExpiredError;
      verifyResult.ok = false;
    }

    return verifyResult;
  }
}

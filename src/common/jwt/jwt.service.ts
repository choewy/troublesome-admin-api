import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { JwtVerifyResult } from './jwt-verify-result';

import { ConfigKey, getEnv } from '@/constant';

@Injectable()
export class JwtService {
  private readonly issuer: string;
  private readonly accessTokenSecret: string;
  private readonly accessTokenSubject: string;
  private readonly refreshTokenSecret: string;
  private readonly refershTokenSubject: string;

  constructor(private readonly configService: ConfigService) {
    const npmPackageName = this.configService.get(ConfigKey.NpmPackageName);
    const npmPackageVersion = this.configService.get(ConfigKey.NpmPackageVersion);

    this.issuer = [npmPackageName, npmPackageVersion, getEnv()].join(':');
    this.accessTokenSecret = this.configService.getOrThrow(ConfigKey.JwtAccessTokenSecret);
    this.refreshTokenSecret = this.configService.getOrThrow(ConfigKey.JwtRefreshTokenSecret);
    this.accessTokenSubject = [this.issuer, 'access'].join(':');
    this.refershTokenSubject = [this.issuer, 'refersh'].join(':');
  }

  issueAccessToken(payload: string | object | Buffer) {
    return this.issueToken(payload, this.accessTokenSecret, {
      issuer: this.issuer,
      subject: this.accessTokenSubject,
      expiresIn: '30m',
    });
  }

  issueRefreshToken(payload: string | object | Buffer) {
    return this.issueToken(payload, this.refreshTokenSecret, {
      issuer: this.issuer,
      subject: this.refershTokenSubject,
      expiresIn: '14d',
    });
  }

  verifyAccessToken<Payload extends jwt.JwtPayload>(token: string) {
    const verifyResult = this.verifyToken<Payload>(token, this.accessTokenSecret);

    if (verifyResult.expired) {
      return this.verifyToken<Payload>(token, this.accessTokenSecret, { ignoreExpiration: true });
    }

    return verifyResult;
  }

  verifyRefreshToken<Payload extends jwt.JwtPayload>(token: string) {
    return this.verifyToken<Payload>(token, this.refreshTokenSecret);
  }

  private issueToken(payload: string | object | Buffer, secret: string, signOptions: jwt.SignOptions = {}) {
    return jwt.sign(payload, secret, signOptions);
  }

  getExpireSeconds(token: string) {
    const claim = this.decodeToken(token) as jwt.JwtPayload;

    const issuedAt = DateTime.fromJSDate(new Date(claim.iat * 1000));
    const expiredAt = DateTime.fromJSDate(new Date(claim.exp * 1000));

    return expiredAt.diff(issuedAt, 'seconds').get('seconds');
  }

  getClaim<Payload extends jwt.JwtPayload>(token: string) {
    return this.decodeToken(token) as Payload;
  }

  private verifyToken<Payload extends jwt.JwtPayload>(token: string, secret: string, verifyOptions: jwt.VerifyOptions = {}) {
    const verifyResult = new JwtVerifyResult<Payload>();

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

  private decodeToken(token: string) {
    return jwt.decode(token) as jwt.JwtPayload;
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { AppConfigFactory } from './app-config.factory';

@Injectable()
export class JwtConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigFactory: AppConfigFactory,
  ) {}

  private get accessTokenSecret() {
    return this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET');
  }

  private get refreshTokenSecret() {
    return this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET');
  }

  private get accessTokenOptions(): Pick<JwtSignOptions, 'subject' | 'audience' | 'issuer'> {
    const packageProfile = this.appConfigFactory.packageProfile;

    return {
      subject: [packageProfile.name, packageProfile.env, 'access_token'].join(':'),
      audience: [packageProfile.name, packageProfile.env, 'admin'].join(':'),
      issuer: [packageProfile.name, packageProfile.env, 'server'].join(':'),
    };
  }

  private get refreshTokenOptions(): Pick<JwtSignOptions, 'subject' | 'audience' | 'issuer'> {
    const packageProfile = this.appConfigFactory.packageProfile;

    return {
      subject: [packageProfile.name, packageProfile.env, 'refresh_token'].join(':'),
      audience: [packageProfile.name, packageProfile.env, 'admin'].join(':'),
      issuer: [packageProfile.name, packageProfile.env, 'server'].join(':'),
    };
  }

  public get accessTokenSignOptions(): JwtSignOptions {
    const signOptions = this.accessTokenOptions as JwtSignOptions;

    signOptions.secret = this.accessTokenSecret;
    signOptions.expiresIn = '1d';

    return signOptions;
  }

  public get refreshTokenSignOptions(): JwtSignOptions {
    const signOptions = this.refreshTokenOptions as JwtSignOptions;

    signOptions.secret = this.refreshTokenSecret;
    signOptions.expiresIn = '14d';

    return signOptions;
  }

  public get accessTokenVerifyOptions(): JwtVerifyOptions {
    const verifyOptions = this.accessTokenOptions as JwtVerifyOptions;

    verifyOptions.secret = this.accessTokenSecret;

    return verifyOptions;
  }

  public get refreshTokenVerifyOptions(): JwtVerifyOptions {
    const verifyOptions = this.refreshTokenOptions as JwtVerifyOptions;

    verifyOptions.secret = this.refreshTokenSecret;

    return verifyOptions;
  }
}

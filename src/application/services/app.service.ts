import { ListenOptions } from 'net';

import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

import { ConfigKey, getEnv } from '@/constant';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public get packageProfile() {
    return {
      name: this.configService.get(ConfigKey.NpmPackageName),
      version: this.configService.get(ConfigKey.NpmPackageVersion),
      env: getEnv(),
    };
  }

  public get listenOptions(): ListenOptions {
    return {
      host: this.configService.getOrThrow(ConfigKey.Host),
      port: +this.configService.getOrThrow(ConfigKey.Port),
    };
  }

  public get corsOptions(): CorsOptions {
    return {
      origin: new RegExp(this.configService.getOrThrow(ConfigKey.CorsOrigin)),
      preflightContinue: false,
      credentials: false,
    };
  }
}

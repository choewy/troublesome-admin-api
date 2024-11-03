import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKey } from './constant/enums';
import { getEnv } from './constant/helpers';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public getAppProfile() {
    return {
      name: this.configService.get(ConfigKey.NpmPackageName),
      version: this.configService.get(ConfigKey.NpmPackageVersion),
      env: getEnv(),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public getAppProfile() {
    return {
      name: this.configService.get('npm_package_name'),
      version: this.configService.get('npm_package_version'),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminRootConfigFactory {
  constructor(private readonly configService: ConfigService) {}

  public get value() {
    return {
      id: 1,
      name: 'root',
      email: this.configService.getOrThrow('ADMIN_ROOT_EMAIL'),
      password: this.configService.getOrThrow('ADMIN_ROOT_PASSWORD'),
    };
  }
}

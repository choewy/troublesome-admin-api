import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IoRedis from 'ioredis';

import { ConfigKey } from '@/constant';

@Injectable()
export class RedisService extends IoRedis {
  constructor(configService: ConfigService) {
    super({
      host: configService.getOrThrow(ConfigKey.RedisHost),
      port: +configService.getOrThrow(ConfigKey.RedisPort),
      db: +(configService.get(ConfigKey.RedisDatabase) ?? 0),
    });
  }
}

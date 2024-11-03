import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IoRedis, { RedisOptions } from 'ioredis';

import { ConfigKey } from '@/constant/enums';

@Injectable()
export class RedisService extends IoRedis {
  private readonly _redisOptions: RedisOptions;

  constructor(configService: ConfigService) {
    const redisOptions = {
      host: configService.getOrThrow(ConfigKey.RedisHost),
      port: +configService.getOrThrow(ConfigKey.RedisPort),
      db: +(configService.get(ConfigKey.RedisDatabase) ?? 0),
    };

    super(redisOptions);
    this._redisOptions = redisOptions;
  }

  public get redisOptions() {
    return this._redisOptions;
  }
}

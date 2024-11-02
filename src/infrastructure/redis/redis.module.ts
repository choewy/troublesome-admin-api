import { Module } from '@nestjs/common';

import { redisDefaultStorageProviders } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
  providers: [].concat([RedisService]).concat(redisDefaultStorageProviders),
  exports: [].concat([RedisService]).concat(redisDefaultStorageProviders),
})
export class RedisModule {}

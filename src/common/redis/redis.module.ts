import { Global, Module } from '@nestjs/common';
import { MicroserviceHealthIndicator } from '@nestjs/terminus';

import { RedisHealthIndicator } from './redis-health.indicator';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService, MicroserviceHealthIndicator, RedisHealthIndicator],
  exports: [RedisService, RedisHealthIndicator],
})
export class RedisModule {}

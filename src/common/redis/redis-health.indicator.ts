import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { MicroserviceHealthIndicator } from '@nestjs/terminus';

import { RedisService } from './redis.service';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    private microServiceIndicator: MicroserviceHealthIndicator,
    private redisService: RedisService,
  ) {}

  pickCheck() {
    return this.microServiceIndicator.pingCheck('redis', { transport: Transport.REDIS, options: this.redisService.redisOptions });
  }
}

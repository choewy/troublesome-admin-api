import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { RedisService } from '@/common/redis/redis.service';

@Injectable()
export class HealthService {
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    @InjectDataSource()
    private defaultDataSource: DataSource,
    private microServiceIndicator: MicroserviceHealthIndicator,
    private redisService: RedisService,
  ) {}

  async healthCheck() {
    const healthCheckResult = await this.healthCheckService
      .check([
        () => this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
        () => this.memoryIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
        () => this.diskHealthIndicator.checkStorage('disk', { path: '/', threshold: 250 * 1024 * 1024 * 1024 }),
        () => this.typeOrmHealthIndicator.pingCheck('database', { connection: this.defaultDataSource }),
        () => this.microServiceIndicator.pingCheck('redis', { transport: Transport.REDIS, options: this.redisService.redisOptions }),
      ])
      .then((res) => res.details)
      .catch((e) => {
        const result = e.response;
        const errors = result.error;
        const details = result.details;

        for (const key of Object.keys(errors)) {
          details[key].message = e.message;
        }

        return details;
      });

    return healthCheckResult;
  }
}

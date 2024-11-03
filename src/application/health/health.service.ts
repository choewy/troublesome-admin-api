import { Injectable } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

import { DatabaseHealthIndicator } from '@/common/database/database-health.indicator';
import { RedisHealthIndicator } from '@/common/redis/redis-health.indicator';

@Injectable()
export class HealthService {
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private redisHealthIndicator: RedisHealthIndicator,
  ) {}

  async healthCheck() {
    const healthCheckResult = await this.healthCheckService
      .check([
        () => this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
        () => this.memoryIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
        () => this.diskHealthIndicator.checkStorage('disk', { path: '/', threshold: 250 * 1024 * 1024 * 1024 }),
        () => this.databaseHealthIndicator.pingCheck(),
        () => this.redisHealthIndicator.pickCheck(),
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

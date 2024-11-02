import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis';

import { JwtStorage } from '@/domain';

@Injectable()
export class JwtStorageImpl implements JwtStorage {
  constructor(private readonly redisService: RedisService) {}

  private createAccessTokenKey(id: bigint | string) {
    return `jwt:${id}:access`;
  }

  private createRefreshTokenKey(id: bigint | string) {
    return `jwt:${id}:refresh`;
  }

  async getAccessToken(id: bigint | string) {
    return this.redisService.get(this.createAccessTokenKey(id));
  }

  async getRefreshToken(id: bigint | string) {
    return this.redisService.get(this.createRefreshTokenKey(id));
  }

  async setAccessToken(id: bigint | string, token: string, seconds: number) {
    const key = this.createAccessTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }

  async setRefreshToken(id: bigint | string, token: string, seconds: number) {
    const key = this.createRefreshTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }

  async removeTokens(id: bigint | string): Promise<void> {
    await Promise.all([this.redisService.del(this.createAccessTokenKey(id)), this.redisService.del(this.createRefreshTokenKey(id))]);
  }
}

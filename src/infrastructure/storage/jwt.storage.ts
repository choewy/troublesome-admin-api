import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis';

import { BigIntId, JwtStorage } from '@/domain';

@Injectable()
export class JwtStorageImpl implements JwtStorage {
  constructor(private readonly redisService: RedisService) {}

  private createAccessTokenKey(id: BigIntId) {
    return `jwt:${id.value}:access`;
  }

  private createRefreshTokenKey(id: BigIntId) {
    return `jwt:${id.value}:refresh`;
  }

  async getAccessToken(id: BigIntId) {
    return this.redisService.get(this.createAccessTokenKey(id));
  }

  async getRefreshToken(id: BigIntId) {
    return this.redisService.get(this.createRefreshTokenKey(id));
  }

  async setAccessToken(id: BigIntId, token: string, seconds: number) {
    const key = this.createAccessTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }

  async setRefreshToken(id: BigIntId, token: string, seconds: number) {
    const key = this.createRefreshTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }
}

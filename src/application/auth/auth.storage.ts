import { Injectable } from '@nestjs/common';

import { RedisService } from '@/common/redis/redis.service';

@Injectable()
export class AuthStorage {
  constructor(private readonly redisService: RedisService) {}

  private createAuthKey(id: string) {
    return `auth:${id}`;
  }

  private createAuthAccessTokenKey(id: string) {
    return `${this.createAuthKey(id)}:access-token`;
  }

  private createAuthRefreshTokenKey(id: string) {
    return `${this.createAuthKey(id)}:refresh-token`;
  }

  async getTokens(id: string) {
    const [accessToken, refreshToken] = await Promise.all([this.getAccessToken(id), this.getRefreshToken(id)]);

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return null;
  }

  async setTokens(id: string, accessToken: string, refreshToken: string, accessTokenSeconds: number, refreshTokenSeconds: number) {
    await Promise.all([
      this.setAccessToken(id, accessToken, accessTokenSeconds),
      this.setRefreshToken(id, refreshToken, refreshTokenSeconds),
    ]);
  }

  async getAccessToken(id: string) {
    return this.redisService.get(this.createAuthAccessTokenKey(id));
  }

  async getRefreshToken(id: string) {
    return this.redisService.get(this.createAuthRefreshTokenKey(id));
  }

  async setAccessToken(id: string, token: string, seconds: number) {
    const key = this.createAuthAccessTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }

  async setRefreshToken(id: string, token: string, seconds: number) {
    const key = this.createAuthRefreshTokenKey(id);

    await this.redisService.set(key, token);
    await this.redisService.expire(key, seconds);
  }

  async removeTokens(id: string): Promise<void> {
    await this.redisService.del(this.createAuthKey(id));
  }
}

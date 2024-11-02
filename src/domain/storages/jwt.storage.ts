import { BigIntId } from '../vo';

export interface JwtStorage {
  getAccessToken(id: BigIntId): Promise<string | null>;
  setAccessToken(id: BigIntId, token: string, seconds: number): Promise<void>;
  getRefreshToken(id: BigIntId): Promise<string | null>;
  setRefreshToken(id: BigIntId, token: string, seconds: number): Promise<void>;
}

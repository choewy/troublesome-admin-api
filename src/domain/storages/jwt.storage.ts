export interface JwtStorage {
  getAccessToken(id: bigint | string): Promise<string | null>;
  setAccessToken(id: bigint | string, token: string, seconds: number): Promise<void>;
  getRefreshToken(id: bigint | string): Promise<string | null>;
  setRefreshToken(id: bigint | string, token: string, seconds: number): Promise<void>;
  removeTokens(id: bigint | string): Promise<void>;
}

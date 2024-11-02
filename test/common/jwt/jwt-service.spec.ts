import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@/common/jwt';

describe('JwtService', () => {
  let jwtModule: TestingModule;
  let jwtService: JwtService;

  beforeAll(async () => {
    jwtModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
    }).compile();

    jwtService = new JwtService(jwtModule.get(ConfigService));
  });

  it('JwtService to be defined', () => {
    expect(jwtService).toBeDefined();
  });

  describe('AccessToken', () => {
    let accessToken = '';

    beforeEach(() => {
      accessToken = jwtService.issueAccessToken({ id: 1 });
    });

    it('verifyAccessToken', () => {
      const verifyResult = jwtService.verifyAccessToken(accessToken);

      expect(verifyResult.ok).toBeTruthy();
      expect(verifyResult.expired).toBeFalsy();
      expect(verifyResult.error).toBeNull();
      expect(verifyResult.payload?.id).toEqual(1);
    });
  });

  describe('RefreshToken', () => {
    let refreshToken = '';

    beforeEach(() => {
      refreshToken = jwtService.issueRefreshToken({ id: 1 });
    });

    it('verifyRefreshToken', () => {
      const verifyResult = jwtService.verifyRefreshToken(refreshToken);

      expect(verifyResult.ok).toBeTruthy();
      expect(verifyResult.expired).toBeFalsy();
      expect(verifyResult.error).toBeNull();
      expect(verifyResult.payload?.id).toEqual(1);
    });
  });
});

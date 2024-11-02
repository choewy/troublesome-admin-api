import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { InvalidEmailOrPasswordException } from '../exceptions';
import { JwtClaim, JwtReturn, LoginInput } from '../interfaces';

import { JwtService } from '@/common/jwt';
import { PasswordService } from '@/common/password';
import { JwtStorage, User, UserRepository } from '@/domain';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    @Inject('JwtStorage')
    private readonly jwtStorage: JwtStorage,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<JwtReturn> {
    const user = await this.userRepository.findOneByTypeAndEmail(loginInput.type, loginInput.email);

    if (user === null || (await this.passwordService.compare(user.password, loginInput.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    const jwtClaim = this.createTokenClaim(user);
    const jwtReturn = await this.getTokens(jwtClaim);

    if (jwtReturn.accessToken && jwtReturn.refreshToken) {
      return jwtReturn;
    }

    return this.issueTokens(jwtClaim);
  }

  async logout(accessToken: string) {
    const jwtClaim = this.jwtService.getClaim<{ id: string }>(accessToken);

    if (jwtClaim?.id == null) {
      return;
    }

    return this.jwtStorage.removeTokens(jwtClaim.id);
  }

  createTokenClaim(user: User): JwtClaim {
    return {
      id: user.id.value.toString(),
      type: user.type,
    };
  }

  async getTokens(jwtClaim: JwtClaim): Promise<JwtReturn> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtStorage.getAccessToken(jwtClaim.id),
      this.jwtStorage.getRefreshToken(jwtClaim.id),
    ]);

    return { accessToken, refreshToken };
  }

  async issueTokens(jwtClaim: JwtClaim): Promise<JwtReturn> {
    const accessToken = this.jwtService.issueAccessToken(jwtClaim);
    const refreshToken = this.jwtService.issueRefreshToken(jwtClaim);

    await Promise.all([
      this.jwtStorage.setAccessToken(jwtClaim.id, accessToken, this.jwtService.getExpireSeconds(accessToken)),
      this.jwtStorage.setRefreshToken(jwtClaim.id, refreshToken, this.jwtService.getExpireSeconds(refreshToken)),
    ]);

    return { accessToken, refreshToken };
  }

  async validateTokens(accessToken: string, refreshToken: string) {
    const accessTokenVerifyResult = this.jwtService.verifyAccessToken<JwtClaim>(accessToken);
    const refreshTokenVerifyResult = this.jwtService.verifyRefreshToken(refreshToken);

    if (accessTokenVerifyResult.ok === false) {
      throw new UnauthorizedException();
    }

    let jwtReturn: JwtReturn = { accessToken, refreshToken };

    if (accessTokenVerifyResult.expired) {
      if (refreshTokenVerifyResult.ok === false) {
        throw new UnauthorizedException();
      }

      jwtReturn = await this.issueTokens(accessTokenVerifyResult.payload);
    }

    return jwtReturn;
  }
}

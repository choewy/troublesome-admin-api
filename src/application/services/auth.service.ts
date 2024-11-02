import { Inject, Injectable } from '@nestjs/common';

import { InvalidEmailOrPasswordException } from '../exceptions';
import { JwtReturn, LoginInput } from '../interfaces';

import { JwtService } from '@/common/jwt';
import { PasswordService } from '@/common/password';
import { JwtStorage, User, UserRepository, UserType } from '@/domain';

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

  async login(type: UserType, loginInput: LoginInput): Promise<JwtReturn> {
    const user = await this.userRepository.findOneByTypeAndEmail(type, loginInput.email);

    console.log(user);

    if (user === null || (await this.passwordService.compare(user.password, loginInput.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    return this.issueTokens(user);
  }

  async logout(accessToken: string) {
    const claim = this.jwtService.getClaim<{ id: string }>(accessToken);

    if (claim?.id == null) {
      return;
    }

    return this.jwtStorage.removeTokens(claim.id);
  }

  async issueTokens(user: User): Promise<JwtReturn> {
    const userClaim = { id: user.id.value.toString(), type: user.type };

    let [accessToken, refreshToken] = await Promise.all([
      this.jwtStorage.getAccessToken(userClaim.id),
      this.jwtStorage.getRefreshToken(userClaim.id),
    ]);

    if (!accessToken || !refreshToken) {
      accessToken = this.jwtService.issueAccessToken(userClaim);
      refreshToken = this.jwtService.issueRefreshToken(userClaim);

      await Promise.all([
        this.jwtStorage.setAccessToken(userClaim.id, accessToken, this.jwtService.getExpireSeconds(accessToken)),
        this.jwtStorage.setRefreshToken(userClaim.id, refreshToken, this.jwtService.getExpireSeconds(refreshToken)),
      ]);
    }

    return { accessToken, refreshToken };
  }
}

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

    if (user === null || (await this.passwordService.compare(user.password, loginInput.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    return this.issueTokens(user);
  }

  async issueTokens(user: User): Promise<JwtReturn> {
    let [accessToken, refreshToken] = await Promise.all([
      this.jwtStorage.getAccessToken(user.id),
      this.jwtStorage.getRefreshToken(user.id),
    ]);

    if (!accessToken || !refreshToken) {
      accessToken = this.jwtService.issueAccessToken({ id: user.id, type: user.type });
      refreshToken = this.jwtService.issueRefreshToken({ id: user.id, type: user.type });

      await Promise.all([
        this.jwtStorage.setAccessToken(user.id, accessToken, this.jwtService.getExpireSeconds(accessToken)),
        this.jwtStorage.setRefreshToken(user.id, refreshToken, this.jwtService.getExpireSeconds(refreshToken)),
      ]);
    }

    return { accessToken, refreshToken };
  }
}

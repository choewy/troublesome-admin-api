import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthStorage } from './auth.storage';
import { LoginDTO } from './dto/login.dto';
import { TokensDTO } from './dto/tokens.dto';
import { UserTokenClaimType } from '../user/types';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { JwtService } from '@/common/jwt/jwt.service';
import { PasswordService } from '@/common/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authStorage: AuthStorage,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.userService.getUserByTypeAndEmail(body.type, body.email);

    if (user === null || (await this.passwordService.compare(user.password, body.password)) === false) {
      throw new UnauthorizedException();
    }

    return this.issueTokens(user);
  }

  async logout(accessToken: string) {
    const userClaim = this.jwtService.getClaim<UserTokenClaimType>(accessToken);

    if (userClaim?.id) {
      await this.authStorage.removeTokens(userClaim.id);
    }
  }

  async issueTokens(user: User) {
    let tokens = await this.authStorage.getTokens(user.id);

    if (tokens === null) {
      tokens = this.jwtService.issueTokens(user.toClaim());

      await this.authStorage.setTokens(
        user.id,
        tokens.accessToken,
        tokens.refreshToken,
        this.jwtService.getExpireSeconds(tokens.accessToken),
        this.jwtService.getExpireSeconds(tokens.refreshToken),
      );
    }

    return new TokensDTO(tokens.accessToken, tokens.refreshToken);
  }

  async validateTokens(accessToken: string, refreshToken: string) {
    const accessTokenResult = this.jwtService.verifyAccessToken<UserTokenClaimType>(accessToken);
    const refreshTokenResult = this.jwtService.verifyRefreshToken<UserTokenClaimType>(refreshToken);

    if (accessTokenResult.ok === false) {
      throw new UnauthorizedException();
    }

    if (accessTokenResult.expired === true && refreshTokenResult.ok === false) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserById(accessTokenResult.payload.id);

    if (user === null) {
      throw new UnauthorizedException();
    }

    return { user, expired: accessTokenResult.expired };
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

import { LoginDTO, TokensDTO } from './dtos';
import { InvalidEmailOrPasswordException } from './exceptions';
import { AdminService } from '../admin';

import { JwtConfigFactory } from '@/common';
import { AdminEntity } from '@/libs';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigFactory: JwtConfigFactory,
  ) {}

  async login(body: LoginDTO) {
    const admin = await this.adminService.findByEmail(body.email);

    if (admin === null) {
      throw new InvalidEmailOrPasswordException();
    }

    if ((await verify(admin.password, body.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    const tokens = this.issueTokens(admin);

    return new TokensDTO(tokens.accessToken, tokens.refreshToken);
  }

  issueTokens(admin: AdminEntity) {
    return {
      accessToken: this.issueAccessToken(admin),
      refreshToken: this.issueRefreshToken(admin),
    };
  }

  issueAccessToken(admin: AdminEntity) {
    return this.jwtService.sign({ id: admin.id }, this.jwtConfigFactory.accessTokenSignOptions);
  }

  issueRefreshToken(admin: AdminEntity) {
    return this.jwtService.sign({ id: admin.id }, this.jwtConfigFactory.refreshTokenSignOptions);
  }
}

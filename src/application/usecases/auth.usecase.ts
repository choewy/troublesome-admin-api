import { Injectable } from '@nestjs/common';

import { InvalidEmailOrPasswordException } from '../exceptions';
import { LoginInput, JwtReturn } from '../interfaces';
import { UserService } from '../services';

import { JwtService } from '@/common/jwt';
import { PasswordService } from '@/common/password';
import { UserType } from '@/domain';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(type: UserType, loginInput: LoginInput): Promise<JwtReturn> {
    const user = await this.userService.getByTypeAndEmail(type, loginInput.email);

    if (user === null || (await this.passwordService.compare(user.password, loginInput.password)) === false) {
      throw new InvalidEmailOrPasswordException();
    }

    return {
      accessToken: this.jwtService.issueAccessToken({ id: user.id, type: user.type }),
      refreshToken: this.jwtService.issueAccessToken({ id: user.id, type: user.type }),
    };
  }
}

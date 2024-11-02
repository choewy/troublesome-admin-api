import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { JwtDTO, LoginDTO } from '../dto';

import { AuthService } from '@/application/services';
import { RequestHeader } from '@/constant';
import { UserType } from '@/domain';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  @ApiParam({ name: 'type', type: String, enum: UserType })
  async login(@Body() body: LoginDTO) {
    return plainToInstance(JwtDTO, await this.authService.login(body));
  }

  @Delete('logout')
  @ApiBearerAuth(RequestHeader.AccessToken)
  @ApiOperation({ summary: '로그아웃 API' })
  async logout(@Req() req: Request) {
    const bearerAuth = req.headers.authorization ?? '';
    const accessToken = bearerAuth.replace('Bearer ', '');

    return this.authService.logout(accessToken);
  }
}

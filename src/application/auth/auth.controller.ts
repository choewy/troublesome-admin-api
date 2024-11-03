import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { TokensDTO } from './dto/tokens.dto';

import { ApiCutomHeaders } from '@/common/swagger/decorators';
import { Public } from '@/constant/decorators';
import { RequestHeader } from '@/constant/enums';

@Public()
@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인 API' })
  @ApiCreatedResponse({ type: TokensDTO })
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '로그아웃 API' })
  @ApiCutomHeaders()
  @ApiNoContentResponse()
  async logout(@Req() request: Request) {
    const accessToken = (request.headers[RequestHeader.AccessToken] ?? '').replace('Bearer ', '');

    return this.authService.logout(accessToken);
  }
}

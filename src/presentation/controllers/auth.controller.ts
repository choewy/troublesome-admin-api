import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { JwtDTO, LoginDTO } from '../dto';

import { AuthService } from '@/application/services';
import { UserType } from '@/domain';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':type/login')
  @ApiOperation({ summary: '로그인 API' })
  @ApiParam({ name: 'type', type: String, enum: UserType })
  async login(@Param('type', new ParseEnumPipe(UserType)) type: UserType, @Body() body: LoginDTO) {
    return plainToInstance(JwtDTO, await this.authService.login(type, body));
  }
}

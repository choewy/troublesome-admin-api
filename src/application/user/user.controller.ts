import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { Private } from '@/common';

@Private()
@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id(\\d+)')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getById(id);
  }
}

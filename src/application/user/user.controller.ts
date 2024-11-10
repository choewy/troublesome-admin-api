import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetUserListParamsDTO } from './dto/get-user-list-param.dto';
import { UserListDTO } from './dto/user-list.dto';
import { UserService } from './user.service';
import { RolePermissionKey } from '../role/enums';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permission(RolePermissionKey.UserList)
  @Get('list')
  @ApiOperation({ summary: '사용자 목록 검색 조회' })
  @ApiOkResponse({ type: UserListDTO })
  async getUserList(@Query() queryParams: GetUserListParamsDTO) {
    return this.userService.getUserList(queryParams);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { RoleService } from './role.service';

@ApiTags('역할')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: '역할 목록 검색 조회' })
  @ApiOkResponse({ type: RoleListDTO })
  async getRoleList(@Query() queryParam: GetRoleListParamDTO) {
    return this.roleService.getRoleList(queryParam);
  }
}

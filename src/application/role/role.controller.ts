import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckExistRoleByNameParamDTO } from './dto/check-exist-role-by-name-param.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { DeleteRoleDTO } from './dto/delete-role.dto';
import { DeleteRolesDTO } from './dto/delete-roles.dto';
import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RoleService } from './role.service';

import { Public } from '@/constant/decorators';

@Public()
@ApiTags('역할')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '역할 목록 검색 조회' })
  @ApiOkResponse({ type: RoleListDTO })
  async getRoleList(@Query() queryParam: GetRoleListParamDTO) {
    return this.roleService.getRoleList(queryParam);
  }

  @Get('exist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '역할명 존재 여부 확인' })
  async checkExistRoleByName(@Query() queryParam: CheckExistRoleByNameParamDTO) {
    return this.roleService.checkExistRoleByName(queryParam.name);
  }

  @Post('create')
  @ApiOperation({ summary: '역할 생성' })
  @ApiCreatedResponse()
  async createRole(@Body() body: CreateRoleDTO) {
    return this.roleService.createRole(body);
  }

  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 수정' })
  @ApiNoContentResponse()
  async updateRole(@Body() body: UpdateRoleDTO) {
    return this.roleService.updateRole(body);
  }

  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiNoContentResponse()
  async deleteRole(@Body() body: DeleteRoleDTO) {
    return this.roleService.deleteRoles([body.id]);
  }

  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiNoContentResponse()
  async deleteRoles(@Body() body: DeleteRolesDTO) {
    return this.roleService.deleteRoles(body.ids);
  }
}

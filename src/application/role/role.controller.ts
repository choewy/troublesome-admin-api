import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CheckExistRoleByNameParamDTO } from './dto/check-exist-role-by-name-param.dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { DeleteRoleDTO } from './dto/delete-role.dto';
import { DeleteRolesDTO } from './dto/delete-roles.dto';
import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { GetRoleParamDTO } from './dto/get-role-param.dto';
import { RoleDetailDTO } from './dto/role-detail.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { UpdateRolePermissionsDTO } from './dto/update-role-permissions.dto';
import { UpdateRoleUsersDTO } from './dto/update-role-users.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RolePermissionKey } from './enums';
import { RoleService } from './role.service';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('역할')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission(RolePermissionKey.RoleList)
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '역할 목록 검색 조회' })
  @ApiOkResponse({ type: RoleListDTO })
  async getRoleList(@Query() queryParam: GetRoleListParamDTO) {
    return this.roleService.getRoleList(queryParam);
  }

  @Permission(RolePermissionKey.RoleRead)
  @Get('exist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '역할명 존재 여부 확인' })
  async checkExistRoleByName(@Query() queryParam: CheckExistRoleByNameParamDTO) {
    return this.roleService.checkExistRoleByName(queryParam.name);
  }

  @Permission(RolePermissionKey.RoleRead)
  @Get('detail/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '역할 조회' })
  @ApiOkResponse({ type: RoleDetailDTO })
  async getRoleDetail(@Param() param: GetRoleParamDTO) {
    return this.roleService.getRoleDetail(param.id);
  }

  @Permission(RolePermissionKey.RoleCreate)
  @Post('create')
  @ApiOperation({ summary: '역할 생성' })
  @ApiCreatedResponse()
  async createRole(@Body() body: CreateRoleDTO) {
    return this.roleService.createRole(body);
  }

  @Permission(RolePermissionKey.RoleUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 수정' })
  @ApiNoContentResponse()
  async updateRole(@Body() body: UpdateRoleDTO) {
    return this.roleService.updateRole(body);
  }

  @Permission(RolePermissionKey.RolePermissionUpdate)
  @Put('update/permissions')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 권한 수정' })
  @ApiNoContentResponse()
  async updateRolePermissions(@Body() body: UpdateRolePermissionsDTO) {
    return this.roleService.updateRolePermissions(body);
  }

  @Permission(RolePermissionKey.RoleUserUpdate)
  @Put('update/users')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 사용자 수정' })
  @ApiNoContentResponse()
  async updateRoleUsers(@Body() body: UpdateRoleUsersDTO) {
    return this.roleService.updateRoleUsers(body);
  }

  @Permission(RolePermissionKey.RoleDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiNoContentResponse()
  async deleteRole(@Body() body: DeleteRoleDTO) {
    return this.roleService.deleteRoles([body.id]);
  }

  @Permission(RolePermissionKey.RoleDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiNoContentResponse()
  async deleteRoles(@Body() body: DeleteRolesDTO) {
    return this.roleService.deleteRoles(body.ids);
  }
}

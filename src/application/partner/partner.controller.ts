import { Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';
import { RolePermissionKey } from '../role/enums';
import { CheckExistPartnerGroupByNameParamDTO } from './dto/check-exist-partner-group-by-name-param.dto';
import { PartnerGroupExistByNameResultDTO } from './dto/partner-group-exist-by-name-result.dto';

import { Permission, Public } from '@/constant/decorators';

@Public()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Permission(RolePermissionKey.PartnerList)
  @Get('list')
  @ApiOperation({ summary: '고객사 목록 검색 조회' })
  @ApiOkResponse()
  async getPartnerList() {
    return;
  }

  @Permission(RolePermissionKey.PartnerRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '고객사 조회' })
  @ApiOkResponse()
  async getPartnerDetail() {
    return;
  }

  @Permission(RolePermissionKey.PartnerCreate)
  @Post('create')
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async createPartner() {
    return;
  }

  @Permission(RolePermissionKey.PartnerUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 수정' })
  @ApiNoContentResponse()
  async updatePartner() {
    return;
  }

  @Permission(RolePermissionKey.PartnerUserUpdate)
  @Patch('update/users')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 사용자 추가/삭제' })
  @ApiNoContentResponse()
  async updatePartnerUsers() {
    return;
  }

  @Permission(RolePermissionKey.PartnerDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 삭제' })
  @ApiNoContentResponse()
  async deletePartner() {
    return;
  }

  @Permission(RolePermissionKey.PartnerDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 삭제' })
  @ApiNoContentResponse()
  async deletePartners() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupList)
  @Get('groups/list')
  @ApiOperation({ summary: '고객사 그룹 목록 검색 조회' })
  @ApiOkResponse()
  async getPartnerGroupList() {
    return;
  }

  @Permission(RolePermissionKey.PartnerRead)
  @Get('exist')
  @ApiOperation({ summary: '고객사 그룹명 중복 여부 확인' })
  @ApiOkResponse({ type: PartnerGroupExistByNameResultDTO })
  async checkExistRoleByName(@Query() queryParam: CheckExistPartnerGroupByNameParamDTO) {
    return this.partnerService.checkExistPartnerGroupByName(queryParam.name);
  }

  @Permission(RolePermissionKey.PartnerGroupRead)
  @Get('groups/detail/:id')
  @ApiOperation({ summary: '고객사 그룹 조회' })
  @ApiOkResponse()
  async getPartnerGroupDetail() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupCreate)
  @Post('groups/create')
  @ApiOperation({ summary: '고객사 그룹 생성' })
  @ApiCreatedResponse()
  async createPartnerGroup() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupUpdate)
  @Patch('groups/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 수정' })
  @ApiNoContentResponse()
  async updatePartnerGroup() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupPartnerUpdate)
  @Put('groups/partners')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 고객사 추가/삭제' })
  @ApiNoContentResponse()
  async updatePartnerGroupPartners() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupDelete)
  @Put('groups/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 삭제' })
  @ApiNoContentResponse()
  async deletePartnerGroup() {
    return;
  }

  @Permission(RolePermissionKey.PartnerGroupDelete)
  @Put('groups/delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 삭제' })
  @ApiNoContentResponse()
  async deletePartnerGroups() {
    return;
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PartnerService } from './partner.service';
import { RolePermissionKey } from '../role/enums';
import { CheckExistPartnerByNameParamDTO } from './dto/check-exist-partner-by-name-param.dto';
import { CheckExistPartnerGroupByNameParamDTO } from './dto/check-exist-partner-group-by-name-param.dto';
import { CreatePartnerGroupDTO } from './dto/create-partner-group.dto';
import { CreatePartnerDTO } from './dto/create-partner.dto';
import { DeletePartnerGroupDTO } from './dto/delete-partner-group.dto';
import { DeletePartnerGroupsDTO } from './dto/delete-partner-groups.dto';
import { GetPartnerGroupListParamDTO } from './dto/get-partner-group-list-param.dto';
import { GetPartnerGroupParamDTO } from './dto/get-partner-group-param.dto';
import { GetPartnerListParamDTO } from './dto/get-partner-list-param.dto';
import { GetPartnerParamDTO } from './dto/get-partner-param.dto';
import { PartnerExistByNameResultDTO } from './dto/partner-exist-by-name-result.dto';
import { PartnerGroupExistByNameResultDTO } from './dto/partner-group-exist-by-name-result.dto';
import { PartnerGroupListDTO } from './dto/partner-group-list.dto';
import { PartnerGroupDTO } from './dto/partner-group.dto';
import { PartnerListDTO } from './dto/partner-list.dto';
import { PartnerDTO } from './dto/patner.dto';
import { UpdatePartnerGroupPartnersDTO } from './dto/update-partner-group-partners.dto';
import { UpdatePartnerGroupDTO } from './dto/update-partner-group.dto';
import { UpdatePartnerUsersDTO } from './dto/update-partner-users.dto';
import { UpdatePartnerDTO } from './dto/update-partner.dto';

import { Permission, Public } from '@/constant/decorators';

@Public()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Permission(RolePermissionKey.PartnerList)
  @Get('list')
  @ApiOperation({ summary: '고객사 목록 검색 조회' })
  @ApiOkResponse({ type: PartnerListDTO })
  async getPartnerList(@Query() queryParam: GetPartnerListParamDTO) {
    return this.partnerService.getPartnerList(queryParam);
  }

  @Permission(RolePermissionKey.PartnerRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '고객사 조회' })
  @ApiOkResponse({ type: PartnerDTO })
  async getPartnerDetail(@Param() param: GetPartnerParamDTO) {
    return this.partnerService.getPartnerDetail(param.id);
  }

  @Permission(RolePermissionKey.PartnerRead)
  @Get('exist')
  @ApiOperation({ summary: '고객사명 중복 여부 확인' })
  @ApiOkResponse({ type: PartnerExistByNameResultDTO })
  async checkExistPartnerByName(@Query() queryParam: CheckExistPartnerByNameParamDTO) {
    return this.partnerService.checkExistPartnerByName(queryParam.partnerGroupId, queryParam.name);
  }

  @Permission(RolePermissionKey.PartnerCreate)
  @Post('create')
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async createPartner(@Body() body: CreatePartnerDTO) {
    return this.partnerService.createPartner(body);
  }

  @Permission(RolePermissionKey.PartnerUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 수정' })
  @ApiNoContentResponse()
  async updatePartner(@Body() body: UpdatePartnerDTO) {
    return this.partnerService.updatePartner(body);
  }

  @Permission(RolePermissionKey.PartnerUserUpdate)
  @Patch('update/users')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 사용자 추가/삭제' })
  @ApiNoContentResponse()
  async updatePartnerUsers(body: UpdatePartnerUsersDTO) {
    return this.partnerService.updatePartnerUsers(body);
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
  @ApiOkResponse({ type: PartnerGroupListDTO })
  async getPartnerGroupList(@Query() queryParam: GetPartnerGroupListParamDTO) {
    return this.partnerService.getPartnerGroupList(queryParam);
  }

  @Permission(RolePermissionKey.PartnerGroupRead)
  @Get('exist')
  @ApiOperation({ summary: '고객사 그룹명 중복 여부 확인' })
  @ApiOkResponse({ type: PartnerGroupExistByNameResultDTO })
  async checkExistPartnerGroupByName(@Query() queryParam: CheckExistPartnerGroupByNameParamDTO) {
    return this.partnerService.checkExistPartnerGroupByName(queryParam.name);
  }

  @Permission(RolePermissionKey.PartnerGroupRead)
  @Get('groups/detail/:id')
  @ApiOperation({ summary: '고객사 그룹 조회' })
  @ApiOkResponse({ type: PartnerGroupDTO })
  async getPartnerGroupDetail(@Param() param: GetPartnerGroupParamDTO) {
    return this.partnerService.getPartnerGroupDetail(param.id);
  }

  @Permission(RolePermissionKey.PartnerGroupCreate)
  @Post('groups/create')
  @ApiOperation({ summary: '고객사 그룹 생성' })
  @ApiCreatedResponse()
  async createPartnerGroup(@Body() body: CreatePartnerGroupDTO) {
    return this.partnerService.createPartnerGroup(body);
  }

  @Permission(RolePermissionKey.PartnerGroupUpdate)
  @Patch('groups/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 수정' })
  @ApiNoContentResponse()
  async updatePartnerGroup(@Body() body: UpdatePartnerGroupDTO) {
    return this.partnerService.updatePartnerGroup(body);
  }

  @Permission(RolePermissionKey.PartnerGroupPartnerUpdate)
  @Put('groups/partners')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 고객사 추가/삭제' })
  @ApiNoContentResponse()
  async updatePartnerGroupPartners(@Body() body: UpdatePartnerGroupPartnersDTO) {
    return this.partnerService.updatePartnerGroupPartners(body);
  }

  @Permission(RolePermissionKey.PartnerGroupDelete)
  @Put('groups/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 삭제' })
  @ApiNoContentResponse()
  async deletePartnerGroup(@Body() body: DeletePartnerGroupDTO) {
    return this.partnerService.deletePartnerGroups([body.id]);
  }

  @Permission(RolePermissionKey.PartnerGroupDelete)
  @Put('groups/delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 삭제' })
  @ApiNoContentResponse()
  async deletePartnerGroups(@Body() body: DeletePartnerGroupsDTO) {
    return this.partnerService.deletePartnerGroups(body.ids);
  }
}

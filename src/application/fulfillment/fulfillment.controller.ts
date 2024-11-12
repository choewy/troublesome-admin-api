import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';
import { RolePermissionKey } from '../role/enums';
import { CheckExistFulfillmentByNameParamDTO } from './dto/check-exist-fulfillment-by-name-param.dto';
import { CheckExistFulfillmentGroupByNameParamDTO } from './dto/check-exist-fulfillment-group-by-name-param.dto';
import { CreateFulfillmentGroupDTO } from './dto/create-fulfillment-group.dto';
import { CreateFulfillmentDTO } from './dto/create-fulfillment.dto';
import { DeleteFulfillmentGroupDTO } from './dto/delete-fulfillment-group.dto';
import { DeleteFulfillmentGroupsDTO } from './dto/delete-fulfillment-groups.dto';
import { DeleteFulfillmentDTO } from './dto/delete-fulfillment.dto';
import { DeleteFulfillmentsDTO } from './dto/delete-fulfillments.dto';
import { FulfillmentExistByNameResultDTO } from './dto/fulfillment-exist-by-name-result.dto';
import { FulfillmentGroupExistByNameResultDTO } from './dto/fulfillment-group-exist-by-name-result.dto';
import { FulfillmentGroupListDTO } from './dto/fulfillment-group-list.dto';
import { FulfillmentGroupDTO } from './dto/fulfillment-group.dto';
import { FulfillmentListDTO } from './dto/fulfillment-list.dto';
import { FulfillmentDTO } from './dto/fulfillment.dto';
import { GetFulfillmentGroupListParamDTO } from './dto/get-fulfillment-group-list-param.dto';
import { GetFulfillmentGroupParamDTO } from './dto/get-fulfillment-group-param.dto';
import { GetFulfillmentListParamDTO } from './dto/get-fulfillment-list-param.dto';
import { GetFulfillmentParamDTO } from './dto/get-fulfillment-param.dto';
import { UpdateFulfillmentGroupFulfillmentsDTO } from './dto/update-fulfillment-group-fulfillments.dto';
import { UpdateFulfillmentGroupDTO } from './dto/update-fulfillment-group.dto';
import { UpdateFulfillmentUsersDTO } from './dto/update-fulfillment-users.dto';
import { UpdateFulfillmentDTO } from './dto/update-fulfillment.dto';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('풀필먼트')
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentSerivce: FulfillmentService) {}

  @Permission(RolePermissionKey.FulfillmentList)
  @Get('list')
  @ApiOperation({ summary: '풀필먼트 목록 검색 조회' })
  @ApiOkResponse({ type: FulfillmentListDTO })
  async getFulfillmentList(@Query() queryParam: GetFulfillmentListParamDTO) {
    return this.fulfillmentSerivce.getFulfillmentList(queryParam);
  }

  @Permission(RolePermissionKey.FulfillmentRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '풀필먼트 조회' })
  @ApiOkResponse({ type: FulfillmentDTO })
  async getFulfillmentDetail(@Param() param: GetFulfillmentParamDTO) {
    return this.fulfillmentSerivce.getFulfillmentDetail(param.id);
  }

  @Permission(RolePermissionKey.FulfillmentRead)
  @Get('exist')
  @ApiOperation({ summary: '풀필먼트명 중복 여부 확인' })
  @ApiOkResponse({ type: FulfillmentExistByNameResultDTO })
  async checkExistFulfillmentByName(@Query() queryParam: CheckExistFulfillmentByNameParamDTO) {
    return this.fulfillmentSerivce.checkExistFulfillmentByName(queryParam.fulfillmentGroupId, queryParam.name);
  }

  @Permission(RolePermissionKey.FulfillmentCreate)
  @Post('create')
  @ApiOperation({ summary: '풀필먼트 등록' })
  @ApiCreatedResponse()
  async createFulfillment(@Body() body: CreateFulfillmentDTO) {
    return this.fulfillmentSerivce.createFulfillment(body);
  }

  @Permission(RolePermissionKey.FulfillmentUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 수정' })
  @ApiNoContentResponse()
  async updateFulfillment(@Body() body: UpdateFulfillmentDTO) {
    return this.fulfillmentSerivce.updateFulfillment(body);
  }

  @Permission(RolePermissionKey.FulfillmentUserUpdate)
  @Patch('update/users')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 사용자 추가/삭제' })
  @ApiNoContentResponse()
  async updateFulfillmentUsers(body: UpdateFulfillmentUsersDTO) {
    return this.fulfillmentSerivce.updateFulfillmentUsers(body);
  }

  @Permission(RolePermissionKey.FulfillmentDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 삭제' })
  @ApiNoContentResponse()
  async deleteFulfillment(body: DeleteFulfillmentDTO) {
    return this.fulfillmentSerivce.deleteFulfillments([body.id]);
  }

  @Permission(RolePermissionKey.FulfillmentDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 삭제' })
  @ApiNoContentResponse()
  async deleteFulfillments(@Body() body: DeleteFulfillmentsDTO) {
    return this.fulfillmentSerivce.deleteFulfillments(body.ids);
  }

  @Permission(RolePermissionKey.FulfillmentGroupList)
  @Get('groups/list')
  @ApiOperation({ summary: '풀필먼트 그룹 목록 검색 조회' })
  @ApiOkResponse({ type: FulfillmentGroupListDTO })
  async getFulfillmentGroupList(@Query() queryParam: GetFulfillmentGroupListParamDTO) {
    return this.fulfillmentSerivce.getFulfillmentGroupList(queryParam);
  }

  @Permission(RolePermissionKey.FulfillmentGroupRead)
  @Get('exist')
  @ApiOperation({ summary: '풀필먼트 그룹명 중복 여부 확인' })
  @ApiOkResponse({ type: FulfillmentGroupExistByNameResultDTO })
  async checkExistFulfillmentGroupByName(@Query() queryParam: CheckExistFulfillmentGroupByNameParamDTO) {
    return this.fulfillmentSerivce.checkExistFulfillmentGroupByName(queryParam.name);
  }

  @Permission(RolePermissionKey.FulfillmentGroupRead)
  @Get('groups/detail/:id')
  @ApiOperation({ summary: '풀필먼트 그룹 조회' })
  @ApiOkResponse({ type: FulfillmentGroupDTO })
  async getFulfillmentGroupDetail(@Param() param: GetFulfillmentGroupParamDTO) {
    return this.fulfillmentSerivce.getFulfillmentGroupDetail(param.id);
  }

  @Permission(RolePermissionKey.FulfillmentGroupCreate)
  @Post('groups/create')
  @ApiOperation({ summary: '고객사 그룹 생성' })
  @ApiCreatedResponse()
  async createFulfillmentGroup(@Body() body: CreateFulfillmentGroupDTO) {
    return this.fulfillmentSerivce.createFulfillmentGroup(body);
  }

  @Permission(RolePermissionKey.FulfillmentGroupUpdate)
  @Patch('groups/update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 그룹 수정' })
  @ApiNoContentResponse()
  async updateFulfillmentGroup(@Body() body: UpdateFulfillmentGroupDTO) {
    return this.fulfillmentSerivce.updateFulfillmentGroup(body);
  }

  @Permission(RolePermissionKey.FulfillmentGroupFulfillmentUpdate)
  @Put('groups/fulfillments')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 그룹 풀필먼트 추가/삭제' })
  @ApiNoContentResponse()
  async updateFulfillmentGroupFulfillments(@Body() body: UpdateFulfillmentGroupFulfillmentsDTO) {
    return this.fulfillmentSerivce.updateFulfillmentGroupFulfillments(body);
  }

  @Permission(RolePermissionKey.FulfillmentGroupDelete)
  @Put('groups/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 그룹 삭제' })
  @ApiNoContentResponse()
  async deleteFulfillmentGroup(@Body() body: DeleteFulfillmentGroupDTO) {
    return this.fulfillmentSerivce.deleteFulfillmentGroups([body.id]);
  }

  @Permission(RolePermissionKey.FulfillmentGroupDelete)
  @Put('groups/delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 그룹 삭제' })
  @ApiNoContentResponse()
  async deleteFulfillmentGroups(@Body() body: DeleteFulfillmentGroupsDTO) {
    return this.fulfillmentSerivce.deleteFulfillmentGroups(body.ids);
  }
}

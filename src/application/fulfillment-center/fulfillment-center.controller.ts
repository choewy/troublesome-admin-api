import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateFulfillmentCenterDTO,
  FulfillmentCenterDTO,
  FulfillmentCenterListDTO,
  FulfillmentCenterListQueryDTO,
  UpdateFulfillmentCenterDTO,
} from './dtos';
import { FulfillmentCenterService } from './fulfillment-center.service';

import { Private } from '@/common';

@Private()
@ApiTags('풀필먼트 센터')
@Controller('fulfillment/centers')
export class FulfillmentCenterController {
  constructor(private readonly fulfillmentCenterService: FulfillmentCenterService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 센터 목록 검색 조회' })
  @ApiOkResponse({ type: FulfillmentCenterListDTO })
  async getList(@Query() query: FulfillmentCenterListQueryDTO) {
    return this.fulfillmentCenterService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '풀필먼트 센터 정보 조회' })
  @ApiOkResponse({ type: FulfillmentCenterDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentCenterService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 센터 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateFulfillmentCenterDTO) {
    return this.fulfillmentCenterService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 정보 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdateFulfillmentCenterDTO) {
    return this.fulfillmentCenterService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 센터 정보 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentCenterService.deleteById(id);
  }
}

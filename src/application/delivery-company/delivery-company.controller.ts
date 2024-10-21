import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';
import {
  CreateDeliveryCompanyDTO,
  DeliveryCompanyDTO,
  DeliveryCompanyListDTO,
  DeliveryCompanyListQueryDTO,
  UpdateDeliveryCompanyDTO,
} from './dtos';

import { Private } from '@/common';

@Private()
@ApiTags('택배사')
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}

  @Get()
  @ApiOperation({ summary: '택배사 목록 검색 조회' })
  @ApiOkResponse({ type: DeliveryCompanyListDTO })
  async getList(@Query() query: DeliveryCompanyListQueryDTO) {
    return this.deliveryCompanyService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '택배사 조회' })
  @ApiOkResponse({ type: DeliveryCompanyDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.deliveryCompanyService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '택배사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateDeliveryCompanyDTO) {
    return this.deliveryCompanyService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdateDeliveryCompanyDTO) {
    return this.deliveryCompanyService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '택배사 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.deliveryCompanyService.deleteById(id);
  }
}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateFulfillmentCompanyDTO,
  FulfillmentCompanyDTO,
  FulfillmentCompanyListDTO,
  FulfillmentCompanyListQueryDTO,
  UpdateFulfillmentCompanyDTO,
} from './dtos';
import { FulfillmentCompanyService } from './fulfillment-company.service';

import { Private } from '@/common';

@Private()
@ApiTags('풀필먼트 업체')
@Controller('fulfillment-companies')
export class FulfillmentCompanyController {
  constructor(private readonly fulfillmentCompanyService: FulfillmentCompanyService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 업체 목록 검색 조회' })
  @ApiOkResponse({ type: FulfillmentCompanyListDTO })
  async getList(@Query() query: FulfillmentCompanyListQueryDTO) {
    return this.fulfillmentCompanyService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '풀필먼트 업체 정보 조회' })
  @ApiOkResponse({ type: FulfillmentCompanyDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentCompanyService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 업체 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateFulfillmentCompanyDTO) {
    return this.fulfillmentCompanyService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 업체 정보 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdateFulfillmentCompanyDTO) {
    return this.fulfillmentCompanyService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 업체 정보 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentCompanyService.deleteById(id);
  }
}

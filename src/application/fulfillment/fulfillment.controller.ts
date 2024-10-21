import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFulfillmentDTO, FulfillmentDTO, FulfillmentListDTO, FulfillmentListQueryDTO, UpdateFulfillmentDTO } from './dtos';
import { FulfillmentService } from './fulfillment.service';

import { Private } from '@/common';

@Private()
@ApiTags('풀필먼트')
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @ApiOperation({ summary: '풀필먼트 목록 검색 조회' })
  @ApiOkResponse({ type: FulfillmentListDTO })
  async getList(@Query() query: FulfillmentListQueryDTO) {
    return this.fulfillmentService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '풀필먼트 정보 조회' })
  @ApiOkResponse({ type: FulfillmentDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '풀필먼트 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateFulfillmentDTO) {
    return this.fulfillmentService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 정보 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdateFulfillmentDTO) {
    return this.fulfillmentService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '풀필먼트 정보 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.fulfillmentService.deleteById(id);
  }
}

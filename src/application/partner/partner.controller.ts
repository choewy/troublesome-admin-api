import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDTO, PartnerDTO, PartnerListDTO, PartnerListQueryDTO, UpdatePartnerDTO } from './dtos';
import { PartnerService } from './partner.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOperation({ summary: '고객사 목록 검색 조회' })
  @ApiOkResponse({ type: PartnerListDTO })
  async getList(@Query() query: PartnerListQueryDTO) {
    return this.partnerService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '고객사 정보 조회' })
  @ApiOkResponse({ type: PartnerDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.partnerService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '고객사 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerDTO) {
    return this.partnerService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 정보 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdatePartnerDTO) {
    return this.partnerService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 정보 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.partnerService.deleteById(id);
  }
}

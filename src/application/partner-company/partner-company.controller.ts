import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreatePartnerCompanyDTO,
  PartnerCompanyDTO,
  PartnerCompanyListDTO,
  PartnerCompanyListQueryDTO,
  UpdatePartnerCompanyDTO,
} from './dtos';
import { PartnerCompanyService } from './partner-company.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사 업체')
@Controller('partner-companies')
export class PartnerCompanyController {
  constructor(private readonly partnerCompanyService: PartnerCompanyService) {}

  @Get()
  @ApiOperation({ summary: '고객사 업체 목록 검색 조회' })
  @ApiOkResponse({ type: PartnerCompanyListDTO })
  async getList(@Query() query: PartnerCompanyListQueryDTO) {
    return this.partnerCompanyService.getList(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '고객사 업체 정보 조회' })
  @ApiOkResponse({ type: PartnerCompanyDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.partnerCompanyService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '고객사 업체 등록' })
  @ApiCreatedResponse()
  async create(@Body() body: CreatePartnerCompanyDTO) {
    return this.partnerCompanyService.create(body);
  }

  @Patch(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 업체 정보 수정' })
  @ApiNoContentResponse()
  async updateById(@Param('id', new ParseIntPipe()) id: number, @Body() body: UpdatePartnerCompanyDTO) {
    return this.partnerCompanyService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '고객사 업체 정보 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.partnerCompanyService.deleteById(id);
  }
}

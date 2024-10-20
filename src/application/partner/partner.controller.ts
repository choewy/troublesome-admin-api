import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePartnerDTO, UpdatePartnerDTO } from './dtos';
import { PartnerService } from './partner.service';

import { Private } from '@/common';

@Private()
@ApiTags('고객사')
@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

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

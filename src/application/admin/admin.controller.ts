import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { AdminDTO, AdminListDTO, CreateAdminDTO } from './dtos';

import { Private, Root } from '@/common';

@Root()
@Private()
@ApiTags('관리자 계정')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: '관리자 계정 목록 조회' })
  @ApiOkResponse({ type: AdminListDTO })
  async getList() {
    return this.adminService.getList();
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: '관리자 계정 조회' })
  @ApiOkResponse({ type: AdminDTO })
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.adminService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: '관리자 계정 생성' })
  @ApiCreatedResponse()
  async create(@Body() body: CreateAdminDTO) {
    return this.adminService.create(body);
  }

  @Delete(':id(\\d+)')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '관리자 계정 삭제' })
  @ApiNoContentResponse()
  async deleteById(@Param('id', new ParseIntPipe()) id: number) {
    return this.adminService.deleteById(id);
  }
}

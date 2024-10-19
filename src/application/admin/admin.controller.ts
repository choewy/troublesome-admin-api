import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dtos';

import { Private, Root } from '@/common';

@Root()
@Private()
@ApiTags('관리자 계정')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: '관리자 계정 생성' })
  async create(@Body() body: CreateAdminDTO) {
    return this.adminService.create(body);
  }
}

import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MallService } from './mall.service';

@ApiTags('몰')
@Controller('malls')
export class MallController {
  constructor(private readonly mallService: MallService) {}

  @Get()
  async getMallList() {
    return [];
  }

  @Post()
  async createMall() {
    return;
  }

  @Patch(':id(\\d+)')
  async updateMall() {
    return;
  }

  @Delete(':id(\\d+)')
  async deleteMall() {
    return;
  }
}

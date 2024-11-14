import { Body, Controller, Get, HttpCode, Patch, Post, Query, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePurchaserDTO } from './dto/create-purchaser.dto';
import { GetPurchaserListParamDTO } from './dto/get-purchaser-list-param.dto';
import { GetPurchaserParamDTO } from './dto/get-purchaser-param.dto';
import { PurchaserListDTO } from './dto/purchase-list.dto';
import { PurchaserService } from './purchaser.service';
import { RolePermissionKey } from '../role/enums';
import { PurchaserDTO } from './dto/purchaser.dto';
import { UpdatePurchaserDTO } from './dto/update-purchaser.dto';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('매입처')
@Controller('purchasers')
export class PurchaserController {
  constructor(private readonly purchaserService: PurchaserService) {}

  @Permission(RolePermissionKey.PurchaserList)
  @Get('list')
  @ApiOperation({ summary: '매입처 목록 검색 조회' })
  @ApiOkResponse({ type: PurchaserListDTO })
  async getPurchaserList(@Query() queryParam: GetPurchaserListParamDTO) {
    return this.purchaserService.getPurchaserList(queryParam);
  }

  @Permission(RolePermissionKey.PurchaserRead)
  @Get('detail')
  @ApiOperation({ summary: '매입처 조회' })
  @ApiOkResponse({ type: PurchaserDTO })
  async getPurchaserDetail(@Query() queryParam: GetPurchaserParamDTO) {
    return this.purchaserService.getPurchaserDetail(queryParam.id);
  }

  @Permission(RolePermissionKey.PurchaserCreate)
  @Post('create')
  @ApiOperation({ summary: '매입처 등록' })
  @ApiCreatedResponse()
  async createPurchaser(@Body() body: CreatePurchaserDTO) {
    return this.purchaserService.createPurchaser(body);
  }

  @Permission(RolePermissionKey.PurchaserUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '매입처 수정' })
  @ApiNoContentResponse()
  async updatePurchaser(@Body() body: UpdatePurchaserDTO) {
    return this.purchaserService.updatePurchaser(body);
  }
}

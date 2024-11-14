import { Body, Controller, Get, HttpCode, Patch, Post, Query, HttpStatus, Put, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePurchaserDTO } from './dto/create-purchaser.dto';
import { DeletePurchaserDTO } from './dto/delete-purchaser.dto';
import { DeletePurchasersDTO } from './dto/delete-purchasers.dto';
import { GetPurchaserListParamDTO } from './dto/get-purchaser-list-param.dto';
import { GetPurchaserParamDTO } from './dto/get-purchaser-param.dto';
import { PurchaserListDTO } from './dto/purchaser-list.dto';
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
  @Get('detail/:id')
  @ApiOperation({ summary: '매입처 조회' })
  @ApiOkResponse({ type: PurchaserDTO })
  async getPurchaserDetail(@Param() param: GetPurchaserParamDTO) {
    return this.purchaserService.getPurchaserDetail(param.id);
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

  @Permission(RolePermissionKey.PurchaserDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '매입처 삭제' })
  @ApiNoContentResponse()
  async deletePurchaser(@Body() body: DeletePurchaserDTO) {
    return this.purchaserService.deletePurchasers([body.id]);
  }

  @Permission(RolePermissionKey.PurchaserDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '매입처 삭제' })
  @ApiNoContentResponse()
  async deletePurchasers(@Body() body: DeletePurchasersDTO) {
    return this.purchaserService.deletePurchasers(body.ids);
  }
}

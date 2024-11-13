import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetPurchaserListParamDTO } from './dto/get-purchaser-list-param.dto';
import { PurchaserListDTO } from './dto/purchase-list.dto';
import { PurchaserService } from './purchaser.service';
import { RolePermissionKey } from '../role/enums';

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
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetItemListParamDTO } from './dto/get-item-list-param.dto';
import { RolePermissionKey } from '../role/enums';
import { GetItemParamDTO } from './dto/get-item-param.dto';
import { ItemListDTO } from './dto/item-list.dto';
import { ItemDTO } from './dto/item.dto';
import { ItemService } from './item.service';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('품목')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Permission(RolePermissionKey.ItemList)
  @Get('list')
  @ApiOperation({ summary: '풒목 목록 검색 조회' })
  @ApiOkResponse({ type: ItemListDTO })
  async getItemList(@Query() queryParam: GetItemListParamDTO) {
    return this.itemService.getItemList(queryParam);
  }

  @Permission(RolePermissionKey.ItemRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '풒목 조회' })
  @ApiOkResponse({ type: ItemDTO })
  async getItemDetail(@Param() param: GetItemParamDTO) {
    return this.itemService.getItemDetail(param.id);
  }
}

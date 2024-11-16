import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetItemListParamDTO } from './dto/get-item-list-param.dto';
import { RolePermissionKey } from '../role/enums';
import { CreateItemDTO } from './dto/create-item.dto';
import { GetItemParamDTO } from './dto/get-item-param.dto';
import { ItemListDTO } from './dto/item-list.dto';
import { ItemDTO } from './dto/item.dto';
import { UpdateItemDTO } from './dto/update-item.dto';
import { ItemService } from './item.service';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('품목')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Permission(RolePermissionKey.ItemList)
  @Get('list')
  @ApiOperation({ summary: '품목 목록 검색 조회' })
  @ApiOkResponse({ type: ItemListDTO })
  async getItemList(@Query() queryParam: GetItemListParamDTO) {
    return this.itemService.getItemList(queryParam);
  }

  @Permission(RolePermissionKey.ItemRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '품목 조회' })
  @ApiOkResponse({ type: ItemDTO })
  async getItemDetail(@Param() param: GetItemParamDTO) {
    return this.itemService.getItemDetail(param.id);
  }

  @Permission(RolePermissionKey.ItemCreate)
  @Post('create')
  @ApiOperation({ summary: '품목 등록' })
  @ApiCreatedResponse()
  async createItem(@Body() body: CreateItemDTO) {
    return this.itemService.createItem(body);
  }

  @Permission(RolePermissionKey.ItemUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '품목 수정' })
  @ApiNoContentResponse()
  async updateItem(@Body() body: UpdateItemDTO) {
    return this.itemService.updateItem(body);
  }
}

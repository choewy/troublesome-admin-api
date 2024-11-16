import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PlatformService } from './platform.service';
import { RolePermissionKey } from '../role/enums';
import { CreatePlatformDTO } from './dto/create-platform.dto';
import { DeletePlatformDTO } from './dto/delete-platform.dto';
import { DeletePlatformsDTO } from './dto/delete-platforms.dto';
import { GetPlatformListParamDTO } from './dto/get-platform-list-param.dto';
import { PlatformListDTO } from './dto/platform-list.dto';
import { UpdatePlatformDTO } from './dto/update-platform.dto';

import { Permission } from '@/constant/decorators';

@ApiTags('플랫폼')
@Controller('platforms')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('list')
  @ApiOperation({ summary: '플랫폼 목록 조회' })
  @ApiOkResponse({ type: PlatformListDTO })
  async getItemList(@Query() queryParam: GetPlatformListParamDTO) {
    return this.platformService.getPlatformList(queryParam);
  }

  @Permission(RolePermissionKey.PlatformCreate)
  @Post('create')
  @ApiOperation({ summary: '플랫폼 등록' })
  @ApiCreatedResponse()
  async createPlatform(@Body() body: CreatePlatformDTO) {
    return this.platformService.createPlatform(body);
  }

  @Permission(RolePermissionKey.PlatformUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '플랫폼 수정' })
  @ApiNoContentResponse()
  async updatePlatform(@Body() body: UpdatePlatformDTO) {
    return this.platformService.updatePlatform(body);
  }

  @Permission(RolePermissionKey.PlatformDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '플랫폼 삭제' })
  @ApiNoContentResponse()
  async deletePlatform(@Body() body: DeletePlatformDTO) {
    return this.platformService.deletePlatforms([body.id]);
  }

  @Permission(RolePermissionKey.PlatformDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '플랫폼 삭제' })
  @ApiNoContentResponse()
  async deletePlatforms(@Body() body: DeletePlatformsDTO) {
    return this.platformService.deletePlatforms(body.ids);
  }
}

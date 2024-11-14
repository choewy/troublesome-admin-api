import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SenderService } from './sender.service';
import { RolePermissionKey } from '../role/enums';
import { CreateSenderDTO } from './dto/create-sender.dto';
import { DeleteSenderDTO } from './dto/delete-sender.dto';
import { DeleteSendersDTO } from './dto/delete-senders.dto';
import { GetSenderListParamDTO } from './dto/get-sender-list-param.dto';
import { GetSenderParamDTO } from './dto/get-sender-param.dto';
import { SenderListDTO } from './dto/sender-list.dto';
import { SenderDTO } from './dto/sender.dto';
import { UpdateSenderDTO } from './dto/update-sender.dto';

import { Permission, Private } from '@/constant/decorators';

@Private()
@ApiTags('발송인')
@Controller('senders')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Permission(RolePermissionKey.SenderList)
  @Get('list')
  @ApiOperation({ summary: '발송인 목록 검색 조회' })
  @ApiOkResponse({ type: SenderListDTO })
  async getSenderList(@Query() queryParam: GetSenderListParamDTO) {
    return this.senderService.getSenderList(queryParam);
  }

  @Permission(RolePermissionKey.SenderRead)
  @Get('detail/:id')
  @ApiOperation({ summary: '발송인 조회' })
  @ApiOkResponse({ type: SenderDTO })
  async getSenderDetail(@Param() param: GetSenderParamDTO) {
    return this.senderService.getSenderDetail(param.id);
  }

  @Permission(RolePermissionKey.SenderCreate)
  @Post('create')
  @ApiOperation({ summary: '발송인 등록' })
  @ApiCreatedResponse()
  async createSender(@Body() body: CreateSenderDTO) {
    return this.senderService.createSender(body);
  }

  @Permission(RolePermissionKey.SenderUpdate)
  @Patch('update')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '발송인 수정' })
  @ApiNoContentResponse()
  async updateSender(@Body() body: UpdateSenderDTO) {
    return this.senderService.updateSender(body);
  }

  @Permission(RolePermissionKey.SenderDelete)
  @Put('delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '발송인 삭제' })
  @ApiNoContentResponse()
  async deleteSender(@Body() body: DeleteSenderDTO) {
    return this.senderService.deleteSenders([body.id]);
  }

  @Permission(RolePermissionKey.SenderDelete)
  @Put('delete/many')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '발송인 삭제' })
  @ApiNoContentResponse()
  async deleteSenders(@Body() body: DeleteSendersDTO) {
    return this.senderService.deleteSenders(body.ids);
  }
}

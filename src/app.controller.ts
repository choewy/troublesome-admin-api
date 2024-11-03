import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './constant/decorators';

@Public()
@ApiTags('앱')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAppProfile() {
    return this.appService.getAppProfile();
  }
}

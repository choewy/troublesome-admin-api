import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from '@/application/services';
import { Public } from '@/constant';

@Public()
@ApiTags('앱')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPackageProfile() {
    return this.appService.packageProfile;
  }
}

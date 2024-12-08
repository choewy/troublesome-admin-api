import { Module } from '@nestjs/common';

import { MallController } from './mall.controller';
import { MallService } from './mall.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [PartnerModule],
  controllers: [MallController],
  providers: [MallService],
  exports: [MallService],
})
export class MallModule {}

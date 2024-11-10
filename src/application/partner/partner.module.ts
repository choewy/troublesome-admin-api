import { Module } from '@nestjs/common';

import { PartnerService } from './partner.service';

@Module({
  controllers: [],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}

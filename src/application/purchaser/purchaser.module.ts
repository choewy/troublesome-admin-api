import { Module } from '@nestjs/common';

import { PurchaserController } from './purchaser.controller';
import { PurchaserService } from './purchaser.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [PartnerModule],
  controllers: [PurchaserController],
  providers: [PurchaserService],
  exports: [PurchaserService],
})
export class PurchaserModule {}

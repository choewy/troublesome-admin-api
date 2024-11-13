import { Module } from '@nestjs/common';

import { PurchaserController } from './purchaser.controller';
import { PurchaserService } from './purchaser.service';

@Module({
  controllers: [PurchaserController],
  providers: [PurchaserService],
  exports: [PurchaserService],
})
export class PurchaserModule {}

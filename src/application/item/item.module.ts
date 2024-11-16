import { Module } from '@nestjs/common';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PartnerModule } from '../partner/partner.module';
import { PurchaserModule } from '../purchaser/purchaser.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PartnerModule, PurchaserModule, UserModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}

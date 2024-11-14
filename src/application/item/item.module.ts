import { Module } from '@nestjs/common';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [PartnerModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}

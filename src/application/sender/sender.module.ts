import { Module } from '@nestjs/common';

import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';
import { FulfillmentModule } from '../fulfillment/fulfillment.module';

@Module({
  imports: [FulfillmentModule],
  controllers: [SenderController],
  providers: [SenderService],
  exports: [SenderService],
})
export class SenderModule {}

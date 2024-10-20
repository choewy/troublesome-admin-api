import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FulfillmentCenterController } from './fulfillment-center.controller';
import { FulfillmentCenterService } from './fulfillment-center.service';

import { FulfillmentCenterEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([FulfillmentCenterEntity])],
  controllers: [FulfillmentCenterController],
  providers: [FulfillmentCenterService],
  exports: [FulfillmentCenterService],
})
export class FulfillmentCenterModule {}

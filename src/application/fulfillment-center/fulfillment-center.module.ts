import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FulfillmentCenterController } from './fulfillment-center.controller';
import { FulfillmentCenterService } from './fulfillment-center.service';
import { DeliveryCompanyModule } from '../delivery-company';
import { DeliveryCompanySettingModule } from '../delivery-company-setting';
import { FulfillmentCompanyModule } from '../fulfillment-company';

import { FulfillmentCenterEntity } from '@/libs';

@Module({
  imports: [
    TypeOrmModule.forFeature([FulfillmentCenterEntity]),
    forwardRef(() => DeliveryCompanyModule),
    forwardRef(() => DeliveryCompanySettingModule),
    forwardRef(() => FulfillmentCompanyModule),
  ],
  controllers: [FulfillmentCenterController],
  providers: [FulfillmentCenterService],
  exports: [FulfillmentCenterService],
})
export class FulfillmentCenterModule {}

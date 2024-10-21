import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FulfillmentController } from './fulfillment.controller';
import { FulfillmentService } from './fulfillment.service';
import { DeliveryCompanyModule } from '../delivery-company';
import { DeliveryCompanySettingModule } from '../delivery-company-setting';
import { FulfillmentCompanyModule } from '../fulfillment-company';

import { FulfillmentEntity } from '@/libs';

@Module({
  imports: [
    TypeOrmModule.forFeature([FulfillmentEntity]),
    forwardRef(() => DeliveryCompanyModule),
    forwardRef(() => DeliveryCompanySettingModule),
    forwardRef(() => FulfillmentCompanyModule),
  ],
  controllers: [FulfillmentController],
  providers: [FulfillmentService],
  exports: [FulfillmentService],
})
export class FulfillmentModule {}

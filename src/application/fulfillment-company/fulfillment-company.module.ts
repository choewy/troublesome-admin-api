import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FulfillmentCompanyController } from './fulfillment-company.controller';
import { FulfillmentCompanyService } from './fulfillment-company.service';

import { FulfillmentCompanyEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([FulfillmentCompanyEntity])],
  controllers: [FulfillmentCompanyController],
  providers: [FulfillmentCompanyService],
  exports: [FulfillmentCompanyService],
})
export class FulfillmentCompanyModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveryCompanyController } from './delivery-company.controller';
import { DeliveryCompanyService } from './delivery-company.service';

import { DeliveryCompanyEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryCompanyEntity])],
  controllers: [DeliveryCompanyController],
  providers: [DeliveryCompanyService],
  exports: [DeliveryCompanyService],
})
export class DeliveryCompanyModule {}

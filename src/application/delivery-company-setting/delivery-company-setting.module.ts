import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveryCompanySettingService } from './delivery-company-setting.service';

import { DeliveryCompanySettingEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryCompanySettingEntity])],
  providers: [DeliveryCompanySettingService],
  exports: [DeliveryCompanySettingService],
})
export class DeliveryCompanySettingModule {}

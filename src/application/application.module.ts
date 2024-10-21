import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { DeliveryCompanyModule } from './delivery-company';
import { DeliveryCompanySettingModule } from './delivery-company-setting';
import { FulfillmentModule } from './fulfillment';
import { FulfillmentCompanyModule } from './fulfillment-company';
import { HealthModule } from './health';
import { PartnerModule } from './partner';
import { UserModule } from './user';

@Module({
  imports: [
    HealthModule,
    AdminModule,
    AuthModule,
    UserModule,
    PartnerModule,
    DeliveryCompanyModule,
    DeliveryCompanySettingModule,
    FulfillmentCompanyModule,
    FulfillmentModule,
  ],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { DeliveryCompanyModule } from './delivery-company';
import { DeliveryCompanySettingModule } from './delivery-company-setting';
import { FulfillmentModule } from './fulfillment';
import { FulfillmentCompanyModule } from './fulfillment-company';
import { HealthModule } from './health';
import { PartnerModule } from './partner';
import { PartnerCompanyModule } from './partner-company';
import { UserModule } from './user';

@Module({
  imports: [
    HealthModule,
    AdminModule,
    AuthModule,
    UserModule,
    DeliveryCompanyModule,
    DeliveryCompanySettingModule,
    FulfillmentCompanyModule,
    FulfillmentModule,
    PartnerCompanyModule,
    PartnerModule,
  ],
})
export class ApplicationModule {}

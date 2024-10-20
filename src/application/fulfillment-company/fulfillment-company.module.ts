import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FulfillmentCompanyEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([FulfillmentCompanyEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class FulfillmentCompanyModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerCompanyController } from './partner-company.controller';
import { PartnerCompanyService } from './partner-company.service';

import { PartnerCompanyEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerCompanyEntity])],
  controllers: [PartnerCompanyController],
  providers: [PartnerCompanyService],
  exports: [PartnerCompanyService],
})
export class PartnerCompanyModule {}

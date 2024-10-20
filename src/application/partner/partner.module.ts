import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

import { PartnerEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}

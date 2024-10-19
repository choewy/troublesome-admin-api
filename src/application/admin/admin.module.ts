import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RootGuard } from './guards';

import { AdminEntity } from '@/libs';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService, RootGuard],
  exports: [AdminService, RootGuard],
})
export class AdminModule {}

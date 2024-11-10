import { Module } from '@nestjs/common';

import { RoleGuard } from './guard/role.guard';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleGuard],
  exports: [RoleService],
})
export class RoleModule {}

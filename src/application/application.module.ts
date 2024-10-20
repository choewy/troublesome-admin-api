import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { PartnerModule } from './partner';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, AdminModule, AuthModule, UserModule, PartnerModule],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, AdminModule, AuthModule, UserModule],
})
export class ApplicationModule {}

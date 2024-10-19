import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { HealthModule } from './health';

@Module({
  imports: [HealthModule, AdminModule, AuthModule],
})
export class ApplicationModule {}

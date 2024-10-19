import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [JwtModule, forwardRef(() => AdminModule)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

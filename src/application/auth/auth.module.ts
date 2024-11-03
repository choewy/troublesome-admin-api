import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStorage } from './auth.storage';
import { JwtGuard } from './guard/jwt.guard';
import { PasswordModule } from '../../common/password/password.module';
import { UserModule } from '../user/user.module';

import { JwtModule } from '@/common/jwt/jwt.module';

@Module({
  imports: [PasswordModule, JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthStorage, JwtGuard],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './application/auth/auth.module';
import { HealthModule } from './application/health';
import { RoleModule } from './application/role/role.module';
import { UserModule } from './application/user/user.module';
import { ContextModule } from './common/context/context.module';
import { DatabaseModule } from './common/database/database.module';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule,
    DatabaseModule,
    RedisModule,
    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as services from './application/services';
import * as usecases from './application/usecases';
import { JwtModule } from './common/jwt';
import { PasswordModule } from './common/password';
import { DatabaseModule, RedisModule } from './infrastructure';
import * as controllers from './presentation/controllers';
import * as guards from './presentation/guards';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, RedisModule, JwtModule, PasswordModule],
  controllers: [].concat(Object.values(controllers)),
  providers: [].concat(Object.values(services)).concat(Object.values(usecases)).concat(Object.values(guards)),
})
export class AppModule {}

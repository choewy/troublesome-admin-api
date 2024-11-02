import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as services from './application/services';
import * as usecases from './application/usecases';
import { JwtModule } from './common/jwt';
import { PasswordModule } from './common/password';
import { DatabaseModule } from './infrastructure';
import * as controllers from './presentation/controllers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, JwtModule, PasswordModule],
  controllers: [].concat(Object.values(controllers)),
  providers: [].concat(Object.values(services)).concat(Object.values(usecases)),
})
export class AppModule {}

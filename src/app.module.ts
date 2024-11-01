import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as services from './application/services';
import { DatabaseModule } from './infrastructure';
import * as controllers from './presentation/controllers';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  controllers: Object.values(controllers),
  providers: Object.values(services),
})
export class AppModule {}

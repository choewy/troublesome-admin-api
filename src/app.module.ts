import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigFactoryModule, TypeOrmConfigFactory } from './common';
import { ContextModule, ContextQueryLogger, LoggerModule } from './core';

@Module({
  imports: [
    ConfigFactoryModule.forRoot(),
    ContextModule.forRoot(),
    LoggerModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfigFactory, ContextQueryLogger],
      useFactory(configFactory: TypeOrmConfigFactory, contextQueryLogger: ContextQueryLogger) {
        return configFactory.createTypeOrmModuleOptions(contextQueryLogger);
      },
    }),
  ],
})
export class AppModule {}

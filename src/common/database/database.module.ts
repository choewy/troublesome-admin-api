import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ConfigKey } from '@/constant/enums';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.getOrThrow(ConfigKey.DatabaseHost),
          port: +configService.getOrThrow(ConfigKey.DatabasePort),
          username: configService.getOrThrow(ConfigKey.DatabaseUsername),
          password: configService.getOrThrow(ConfigKey.DatabasePassword),
          database: configService.getOrThrow(ConfigKey.DatabaseDatabase),
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: configService.get(ConfigKey.DatabaseSynchronize) === 'true',
          logging: ['true', 'false'].includes(configService.get(ConfigKey.DatabaseLogging))
            ? configService.get(ConfigKey.DatabaseLogging) === 'true'
            : configService.get(ConfigKey.DatabaseLogging).split('|'),
          entities: [`${process.cwd()}/dist/**/*.entity.{ts,js}`],
        };
      },
    }),
  ],
})
export class DatabaseModule {}

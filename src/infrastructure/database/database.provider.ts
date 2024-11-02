import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DatabaseConnectionName } from './enums';
import * as defaultRepositories from '../repository';

import { ConfigKey } from '@/constant';

export const DataBaseDefaultProvider: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  name: DatabaseConnectionName.Default,
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
      entities: [`${process.cwd()}/dist/domain/entities/**/*.entity.{ts,js}`],
    };
  },
};

export const databaseDefaultRepositoryProviders: Provider[] = Object.values(defaultRepositories).map((Repository) => ({
  inject: [DataSource],
  provide: Repository.name.replace('Impl', ''),
  useFactory(dataSource: DataSource) {
    return new Repository(dataSource.createEntityManager());
  },
}));

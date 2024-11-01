import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DatabaseConnectionName } from './enums';
import * as defaultRepositories from '../repository';

export const DataBaseDefaultProvider: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  name: DatabaseConnectionName.Default,
  useFactory(configService: ConfigService) {
    return {
      type: 'mysql',
      host: configService.getOrThrow('DB_HOST'),
      port: +configService.getOrThrow('DB_PORT'),
      username: configService.getOrThrow('DB_USERNAME'),
      password: configService.getOrThrow('DB_PASSWORD'),
      database: configService.getOrThrow('DB_DATABASE'),
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      logging: ['true', 'false'].includes(configService.get('DB_LOGGING'))
        ? configService.get('DB_LOGGING') === 'true'
        : configService.get('DB_LOGGING').split('|'),
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

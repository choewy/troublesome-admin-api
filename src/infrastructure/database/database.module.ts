import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataBaseDefaultProvider, databaseDefaultRepositoryProviders } from './database.provider';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(DataBaseDefaultProvider)],
  providers: databaseDefaultRepositoryProviders,
  exports: databaseDefaultRepositoryProviders,
})
export class DatabaseModule {}

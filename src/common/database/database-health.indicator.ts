import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthIndicator {
  constructor(
    @InjectDataSource()
    private defaultDataSource: DataSource,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  pingCheck() {
    return this.typeOrmHealthIndicator.pingCheck('database_default', { connection: this.defaultDataSource });
  }
}

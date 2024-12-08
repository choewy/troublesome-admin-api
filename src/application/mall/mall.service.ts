import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Mall } from './mall.entity';

@Injectable()
export class MallService {
  private readonly mallRepository: Repository<Mall>;

  constructor(private readonly dataSource: DataSource) {
    this.mallRepository = this.dataSource.getRepository(Mall);
  }
}

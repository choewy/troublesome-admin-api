import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Sender } from './sender.entity';

@Injectable()
export class SenderService {
  private readonly senderRepository: Repository<Sender>;

  constructor(private readonly dataSource: DataSource) {
    this.senderRepository = this.dataSource.getRepository(Sender);
  }
}

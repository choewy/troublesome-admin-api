import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FulfillmentCenterEntity } from '@/libs';

@Injectable()
export class FulfillmentCenterService {
  constructor(
    @InjectRepository(FulfillmentCenterEntity)
    private readonly fulfillmentCenterRepository: Repository<FulfillmentCenterEntity>,
  ) {}
}

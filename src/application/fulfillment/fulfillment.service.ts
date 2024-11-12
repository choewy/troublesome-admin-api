import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class FulfillmentService {
  constructor(private readonly dataSource: DataSource) {}
}

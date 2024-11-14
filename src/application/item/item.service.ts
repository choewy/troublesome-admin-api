import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ItemBundle } from './item-bundle.entity';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  private readonly itemRepository: Repository<Item>;
  private readonly itemBundleRepository: Repository<ItemBundle>;

  constructor(private readonly dataSource: DataSource) {
    this.itemRepository = this.dataSource.getRepository(Item);
    this.itemBundleRepository = this.dataSource.getRepository(ItemBundle);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { GetItemListParamDTO } from './dto/get-item-list-param.dto';
import { ItemListDTO } from './dto/item-list.dto';
import { ItemDTO } from './dto/item.dto';
import { ItemSearchKeywordField } from './enums';
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

  private get itemQueryBuilder() {
    return this.itemRepository
      .createQueryBuilder('item')
      .innerJoinAndMapOne('item.partner', 'item.partner', 'partner')
      .leftJoinAndMapOne('item.purchaser', 'item.purchaser', 'purchaser')
      .leftJoinAndMapMany('item.comboItemBundle', 'item.comboItemBundle', 'comboItemBundle')
      .where('1 = 1');
  }

  private createItemSearchKeywordBracket(field: ItemSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case ItemSearchKeywordField.Name:
          qb.orWhere('item.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('item.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getItemList(params: GetItemListParamDTO) {
    const builder = this.itemQueryBuilder;

    if (params.type) {
      builder.andWhere('item.type = :type', { type: params.type });
    }

    if (params.unit) {
      builder.andWhere('item.unit = :unit', { unit: params.unit });
    }

    if (params.keyword) {
      builder.andWhere(this.createItemSearchKeywordBracket(params.field, params.keyword));
    }

    const [items, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new ItemListDTO(items, total, params);
  }

  async getItemDetail(id: string) {
    const item = await this.itemQueryBuilder.andWhere('item.id = :id', { id }).getOne();

    if (item === null) {
      throw new BadRequestException('not found item');
    }

    return new ItemDTO(item);
  }
}

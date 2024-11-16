import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { CreateItemDTO } from './dto/create-item.dto';
import { GetItemListParamDTO } from './dto/get-item-list-param.dto';
import { ItemListDTO } from './dto/item-list.dto';
import { ItemDTO } from './dto/item.dto';
import { ItemSearchKeywordField, ItemType } from './enums';
import { ItemBundle } from './item-bundle.entity';
import { Item } from './item.entity';
import { PurchaserService } from '../purchaser/purchaser.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ItemService {
  private readonly itemRepository: Repository<Item>;
  private readonly itemBundleRepository: Repository<ItemBundle>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly purchaserService: PurchaserService,
  ) {
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

  async createItem(body: CreateItemDTO) {
    if (this.userService.isCorrectRequestUserPartner(body.partnerId) === false) {
      throw new ForbiddenException('cannot create item');
    }

    if (body.type === ItemType.Combo && (Array.isArray(body.bundle) === false || body.bundle.length === 0)) {
      throw new BadRequestException('required bundle');
    }

    if (body.purchaserId && (await this.purchaserService.hasPurchaserById(body.purchaserId)) === false) {
      throw new BadRequestException('not found purchaser');
    }

    await this.itemRepository.save({
      partnerId: body.partnerId,
      purchaserId: body.purchaserId,
      type: body.type,
      name: body.name,
      unit: body.unit,
      quantity: body.quantity,
      purchasePrice: body.purchasePrice,
      salesPrice: body.salesPrice,
      singleItemBundle: body.bundle.map((singleItem) => ({
        singleItemId: singleItem.itemId,
        singleItemCount: singleItem.itemCount,
      })),
    });
  }
}

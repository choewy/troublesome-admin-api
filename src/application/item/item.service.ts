import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { CreateItemDTO } from './dto/create-item.dto';
import { GetItemListParamDTO } from './dto/get-item-list-param.dto';
import { ItemListDTO } from './dto/item-list.dto';
import { ItemDTO } from './dto/item.dto';
import { ItemSearchKeywordField, ItemType } from './enums';
import { ItemBundle } from './item-bundle.entity';
import { Item } from './item.entity';
import { PartnerService } from '../partner/partner.service';
import { PurchaserService } from '../purchaser/purchaser.service';
import { UserService } from '../user/user.service';
import { UpdateItemDTO } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  private readonly itemRepository: Repository<Item>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly partnerService: PartnerService,
    private readonly purchaserService: PurchaserService,
  ) {
    this.itemRepository = this.dataSource.getRepository(Item);
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

  async hasItemById(id: string) {
    return (
      (await this.itemRepository.count({
        select: { id: true },
        where: { id },
        take: 1,
      })) > 0
    );
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

    if (body.partnerId && (await this.partnerService.hasPartnerById(body.partnerId)) === false) {
      throw new BadRequestException('not found partner');
    }

    if (body.purchaserId && (await this.purchaserService.hasPurchaserById(body.purchaserId)) === false) {
      throw new BadRequestException('not found purchaser');
    }

    if (body.type === ItemType.Combo && (Array.isArray(body.bundle) === false || body.bundle.length === 0)) {
      throw new BadRequestException('required bundle');
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

  async updateItem(body: UpdateItemDTO) {
    const item = await this.itemRepository.findOneBy({ id: body.itemId });

    if (item === null) {
      return;
    }

    if (this.userService.isCorrectRequestUserPartner(body.partnerId) === false) {
      throw new ForbiddenException('cannot create item');
    }

    if (body.partnerId && (await this.partnerService.hasPartnerById(body.partnerId)) === false) {
      throw new BadRequestException('not found partner');
    }

    if (body.purchaserId && (await this.purchaserService.hasPurchaserById(body.purchaserId)) === false) {
      throw new BadRequestException('not found purchaser');
    }

    if (body.type === ItemType.Combo && (Array.isArray(body.bundle) === false || body.bundle.length === 0)) {
      throw new BadRequestException('required bundle');
    }

    await this.dataSource.transaction(async (em) => {
      const itemRepository = em.getRepository(Item);

      if (
        (body.name && item.name !== body.name) ||
        (body.type && item.type !== body.type) ||
        (body.unit && item.unit !== body.unit) ||
        (body.quantity && item.quantity !== body.quantity) ||
        (typeof body.purchasePrice === 'number' && item.purchasePrice !== body.purchasePrice) ||
        (typeof body.salesPrice === 'number' && item.salesPrice !== body.salesPrice)
      ) {
        await itemRepository.update(item.id, {
          partnerId: body.partnerId,
          purchaserId: body.purchaserId,
          name: body.name,
          type: body.type,
          unit: body.unit,
          quantity: body.quantity,
          purchasePrice: body.purchasePrice,
          salesPrice: body.salesPrice,
        });
      }

      const itemBundleRepository = em.getRepository(ItemBundle);

      if (body.type === ItemType.Single) {
        await itemBundleRepository.delete({ comboItem: item });
      }

      if (Array.isArray(body.bundle) && body.bundle.length > 0) {
        await itemBundleRepository.delete({ comboItem: item });
        await itemBundleRepository.insert(
          body.bundle.map((singleItem) => ({
            comboItem: item,
            singleItemId: singleItem.itemId,
            singleItemCount: singleItem.itemCount,
          })),
        );
      }
    });
  }
}

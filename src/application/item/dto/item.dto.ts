import { ApiResponseProperty } from '@nestjs/swagger';

import { ItemType, ItemUnit } from '../enums';
import { Item } from '../item.entity';
import { ItemBundleDTO } from './item-bundle.dto';

import { PartnerDTO } from '@/application/partner/dto/patner.dto';
import { PurchaserDTO } from '@/application/purchaser/dto/purchaser.dto';

export class ItemDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, enum: ItemType })
  type: ItemType;

  @ApiResponseProperty({ type: String, enum: ItemUnit })
  unit: ItemUnit;

  @ApiResponseProperty({ type: Number })
  quantity: number;

  @ApiResponseProperty({ type: Number })
  purchasePrice: number;

  @ApiResponseProperty({ type: Number })
  salesPrice: number;

  @ApiResponseProperty({ type: PartnerDTO })
  partner: PartnerDTO;

  @ApiResponseProperty({ type: PurchaserDTO })
  purchaser: PurchaserDTO | null;

  @ApiResponseProperty({ type: [ItemBundleDTO] })
  bundle: ItemBundleDTO[];

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.type = item.type;
    this.unit = item.unit;
    this.quantity = item.quantity;
    this.purchasePrice = item.purchasePrice;
    this.salesPrice = item.salesPrice;
    this.partner = item.partner ? new PartnerDTO(item.partner) : undefined;
    this.purchaser = item.purchaser ? new PurchaserDTO(item.purchaser) : null;
    this.bundle = Array.isArray(item.comboItemBundle) ? item.comboItemBundle.map((itemBundle) => new ItemBundleDTO(itemBundle)) : [];
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }
}

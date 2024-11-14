import { ApiResponseProperty } from '@nestjs/swagger';

import { ItemUnit } from '../enums';
import { ItemBundle } from '../item-bundle.entity';

export class ItemBundleDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String, enum: ItemUnit })
  unit: ItemUnit;

  @ApiResponseProperty({ type: Number })
  quantity: number;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(itemBundle: ItemBundle) {
    this.id = itemBundle.singleItem.id;
    this.name = itemBundle.singleItem.name;
    this.unit = itemBundle.singleItem.unit;
    this.quantity = itemBundle.singleItem.quantity * itemBundle.singleItemCount;
    this.createdAt = itemBundle.createdAt;
    this.updatedAt = itemBundle.updatedAt;
  }
}

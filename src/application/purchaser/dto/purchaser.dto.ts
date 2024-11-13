import { ApiResponseProperty } from '@nestjs/swagger';

import { Purchaser } from '../purchaser.entity';

export class PurchaserDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(purchaser: Purchaser) {
    this.id = purchaser.id;
    this.name = purchaser.name;
    this.createdAt = purchaser.createdAt;
    this.updatedAt = purchaser.updatedAt;
  }
}

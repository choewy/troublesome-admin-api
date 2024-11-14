import { ApiResponseProperty } from '@nestjs/swagger';

import { Purchaser } from '../purchaser.entity';

import { PartnerDTO } from '@/application/partner/dto/patner.dto';

export class PurchaserDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: PartnerDTO })
  partner: PartnerDTO | null;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(purchaser: Purchaser) {
    this.id = purchaser.id;
    this.name = purchaser.name;
    this.partner = purchaser.partner ? new PartnerDTO(purchaser.partner) : null;
    this.createdAt = purchaser.createdAt;
    this.updatedAt = purchaser.updatedAt;
  }
}

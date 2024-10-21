import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '@/libs';

export class DeliveryCompanyDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  alias: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
    this.alias = deliveryCompany.alias;
    this.isActive = deliveryCompany.isActive;
    this.createdAt = deliveryCompany.createdAt;
    this.updatedAt = deliveryCompany.updatedAt;
  }
}

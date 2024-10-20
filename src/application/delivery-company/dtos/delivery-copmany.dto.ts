import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyEntity } from '@/libs';

export class DeliveryCompanyDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  alias: string;

  constructor(deliveryCompany: DeliveryCompanyEntity) {
    this.id = deliveryCompany.id;
    this.name = deliveryCompany.name;
    this.alias = deliveryCompany.alias;
  }
}

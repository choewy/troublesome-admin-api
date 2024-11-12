import { ApiResponseProperty } from '@nestjs/swagger';

import { Fulfillment } from '../fulfillment.entity';
import { FulfillmentGroupDTO } from './fulfillment-group.dto';

export class FulfillmentDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: () => FulfillmentGroupDTO })
  group: FulfillmentGroupDTO;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(fulfillment: Fulfillment) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;

    if (fulfillment.fulfillmentGroup) {
      this.group = new FulfillmentGroupDTO(fulfillment.fulfillmentGroup);
    }

    this.createdAt = fulfillment.createdAt;
    this.updatedAt = fulfillment.updatedAt;
  }
}

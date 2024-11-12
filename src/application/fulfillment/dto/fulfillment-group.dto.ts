import { ApiResponseProperty } from '@nestjs/swagger';

import { FulfillmentGroup } from '../fulfillment-group.entity';
import { FulfillmentDTO } from './fulfillment.dto';

export class FulfillmentGroupDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: [FulfillmentDTO] })
  fulfillments: FulfillmentDTO[];

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(fulfillment: FulfillmentGroup) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;

    if (Array.isArray(fulfillment.fulfillments)) {
      this.fulfillments = fulfillment.fulfillments.map((partner) => new FulfillmentDTO(partner));
    }

    this.createdAt = fulfillment.createdAt;
    this.updatedAt = fulfillment.updatedAt;
  }
}

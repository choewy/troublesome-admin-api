import { ApiResponseProperty } from '@nestjs/swagger';

import { Sender } from '../sender.entity';

import { FulfillmentDTO } from '@/application/fulfillment/dto/fulfillment.dto';

export class SenderDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: FulfillmentDTO })
  fulfillment: FulfillmentDTO | null;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(sender: Sender) {
    this.id = sender.id;
    this.name = sender.name;
    this.fulfillment = sender.fulfillment ? new FulfillmentDTO(sender.fulfillment) : null;
    this.createdAt = sender.createdAt;
    this.updatedAt = sender.updatedAt;
  }
}

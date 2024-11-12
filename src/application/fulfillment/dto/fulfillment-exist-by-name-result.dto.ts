import { ApiResponseProperty } from '@nestjs/swagger';

export class FulfillmentExistByNameResultDTO {
  @ApiResponseProperty({ type: BigInt })
  fulfillmentGroupId: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Boolean })
  exist: boolean;

  constructor(fulfillmentGroupId: string, name: string, exist: boolean) {
    this.fulfillmentGroupId = fulfillmentGroupId;
    this.name = name;
    this.exist = exist;
  }
}

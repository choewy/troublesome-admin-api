import { ApiResponseProperty } from '@nestjs/swagger';

export class FulfillmentGroupExistByNameResultDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Boolean })
  exist: boolean;

  constructor(name: string, exist: boolean) {
    this.name = name;
    this.exist = exist;
  }
}

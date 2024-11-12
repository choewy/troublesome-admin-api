import { ApiResponseProperty } from '@nestjs/swagger';

export class PartnerExistByNameResultDTO {
  @ApiResponseProperty({ type: BigInt })
  partnerGroupId: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Boolean })
  exist: boolean;

  constructor(partnerGroupId: string, name: string, exist: boolean) {
    this.partnerGroupId = partnerGroupId;
    this.name = name;
    this.exist = exist;
  }
}

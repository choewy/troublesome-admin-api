import { ApiResponseProperty } from '@nestjs/swagger';

import { Partner } from '../partner.entity';
import { PartnerGroupDTO } from './partner-group.dto';

export class PartnerDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: () => PartnerGroupDTO })
  group: PartnerGroupDTO;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(partner: Partner) {
    this.id = partner.id;
    this.name = partner.name;

    if (partner.partnerGroup) {
      this.group = new PartnerGroupDTO(partner.partnerGroup);
    }

    this.createdAt = partner.createdAt;
    this.updatedAt = partner.updatedAt;
  }
}

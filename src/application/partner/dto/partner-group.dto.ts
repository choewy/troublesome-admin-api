import { ApiResponseProperty } from '@nestjs/swagger';

import { PartnerGroup } from '../partner-company.entity';
import { PartnerDTO } from './patner.dto';

export class PartnerGroupDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: [PartnerDTO] })
  partners: PartnerDTO[];

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(partnerGroup: PartnerGroup) {
    this.id = partnerGroup.id;
    this.name = partnerGroup.name;

    if (Array.isArray(partnerGroup.partners)) {
      this.partners = partnerGroup.partners.map((partner) => new PartnerDTO(partner));
    }

    this.createdAt = partnerGroup.createdAt;
    this.updatedAt = partnerGroup.updatedAt;
  }
}

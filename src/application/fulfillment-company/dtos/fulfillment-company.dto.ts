import { ApiProperty } from '@nestjs/swagger';

import { FulfillmentCompanyEntity } from '@/libs';

export class FulfillmentCompanyDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  president: string;

  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  fax: string;

  @ApiProperty({ type: String, format: 'email' })
  email: string;

  @ApiProperty({ type: String, format: 'url' })
  url: string;

  @ApiProperty({ type: String })
  zipCode: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  addressDetail: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor(fulfillmentCompany: FulfillmentCompanyEntity) {
    this.id = fulfillmentCompany.id;
    this.name = fulfillmentCompany.name;
    this.president = fulfillmentCompany.president ?? '';
    this.contact = fulfillmentCompany.contact ?? '';
    this.fax = fulfillmentCompany.fax ?? '';
    this.email = fulfillmentCompany.email ?? '';
    this.url = fulfillmentCompany.url ?? '';
    this.zipCode = fulfillmentCompany.zipCode ?? '';
    this.address = fulfillmentCompany.address ?? '';
    this.addressDetail = fulfillmentCompany.addressDetail ?? '';
    this.createdAt = fulfillmentCompany.createdAt;
    this.updatedAt = fulfillmentCompany.updatedAt;
  }
}

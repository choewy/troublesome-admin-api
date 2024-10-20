import { ApiProperty } from '@nestjs/swagger';

import { PartnerEntity } from '@/libs';

export class PartnerDTO {
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

  constructor(partner: PartnerEntity) {
    this.id = partner.id;
    this.name = partner.name;
    this.president = partner.president ?? '';
    this.contact = partner.contact ?? '';
    this.fax = partner.fax ?? '';
    this.email = partner.email ?? '';
    this.url = partner.url ?? '';
    this.zipCode = partner.zipCode ?? '';
    this.address = partner.address ?? '';
    this.addressDetail = partner.addressDetail ?? '';
    this.createdAt = partner.createdAt;
    this.updatedAt = partner.updatedAt;
  }
}

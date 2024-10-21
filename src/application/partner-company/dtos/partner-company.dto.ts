import { ApiProperty } from '@nestjs/swagger';

import { PartnerCompanyEntity } from '@/libs';

export class PartnerCompanyDTO {
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

  constructor(partnerCompany: PartnerCompanyEntity) {
    this.id = partnerCompany.id;
    this.name = partnerCompany.name;
    this.president = partnerCompany.president ?? '';
    this.contact = partnerCompany.contact ?? '';
    this.fax = partnerCompany.fax ?? '';
    this.email = partnerCompany.email ?? '';
    this.url = partnerCompany.url ?? '';
    this.zipCode = partnerCompany.zipCode ?? '';
    this.address = partnerCompany.address ?? '';
    this.addressDetail = partnerCompany.addressDetail ?? '';
    this.createdAt = partnerCompany.createdAt;
    this.updatedAt = partnerCompany.updatedAt;
  }
}

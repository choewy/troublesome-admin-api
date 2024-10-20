import { FulfillmentCompanyEntity } from '@/libs';

export class FulfillmentCompanyDTO {
  id: number;
  name: string;
  president: string;
  contact: string;
  fax: string;
  email: string;
  url: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fulfillmentCompany: FulfillmentCompanyEntity) {
    this.id = fulfillmentCompany.id;
    this.name = fulfillmentCompany.name;
    this.president = fulfillmentCompany.president;
    this.contact = fulfillmentCompany.contact;
    this.fax = fulfillmentCompany.fax;
    this.email = fulfillmentCompany.email;
    this.url = fulfillmentCompany.url;
    this.zipCode = fulfillmentCompany.zipCode;
    this.address = fulfillmentCompany.address;
    this.addressDetail = fulfillmentCompany.addressDetail;
    this.createdAt = fulfillmentCompany.createdAt;
    this.updatedAt = fulfillmentCompany.updatedAt;
  }
}

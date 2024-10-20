import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyDTO } from '@/application/delivery-company';
import { FulfillmentCompanyDTO } from '@/application/fulfillment-company';
import { FulfillmentCenterEntity } from '@/libs';

export class FulfillmentCenterDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  plantCode: string;

  @ApiProperty({ type: String })
  consignerName: string;

  @ApiProperty({ type: String })
  consignerTel: string;

  @ApiProperty({ type: String })
  consignerPhone: string;

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

  @ApiProperty({ type: FulfillmentCompanyDTO })
  fulfillmentCompany: FulfillmentCompanyDTO | null;

  @ApiProperty({ type: DeliveryCompanyDTO })
  defaultDeliveryCompany: DeliveryCompanyDTO | null;

  constructor(fulfillmentCenter: FulfillmentCenterEntity) {
    this.id = fulfillmentCenter.id;
    this.name = fulfillmentCenter.name;
    this.plantCode = fulfillmentCenter.plantCode;
    this.consignerName = fulfillmentCenter.consignerName ?? '';
    this.consignerTel = fulfillmentCenter.consignerTel ?? '';
    this.consignerPhone = fulfillmentCenter.consignerPhone ?? '';
    this.zipCode = fulfillmentCenter.zipCode ?? '';
    this.address = fulfillmentCenter.address ?? '';
    this.addressDetail = fulfillmentCenter.addressDetail ?? '';
    this.createdAt = fulfillmentCenter.createdAt;
    this.updatedAt = fulfillmentCenter.updatedAt;
    this.fulfillmentCompany = fulfillmentCenter.fulfillmentCompany ? new FulfillmentCompanyDTO(fulfillmentCenter.fulfillmentCompany) : null;

    const defaultDeliveryCompany =
      (fulfillmentCenter.deliveryCompanySettings ?? []).find(({ isDefault }) => isDefault === true)?.deliveryCompany ?? null;

    this.defaultDeliveryCompany = defaultDeliveryCompany ? new DeliveryCompanyDTO(defaultDeliveryCompany) : null;
  }
}

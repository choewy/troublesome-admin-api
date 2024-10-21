import { ApiProperty } from '@nestjs/swagger';

import { DeliveryCompanyDTO } from '@/application/delivery-company';
import { FulfillmentCompanyDTO } from '@/application/fulfillment-company';
import { FulfillmentEntity } from '@/libs';

export class FulfillmentDTO {
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

  constructor(fulfillment: FulfillmentEntity) {
    this.id = fulfillment.id;
    this.name = fulfillment.name;
    this.plantCode = fulfillment.plantCode;
    this.consignerName = fulfillment.consignerName ?? '';
    this.consignerTel = fulfillment.consignerTel ?? '';
    this.consignerPhone = fulfillment.consignerPhone ?? '';
    this.zipCode = fulfillment.zipCode ?? '';
    this.address = fulfillment.address ?? '';
    this.addressDetail = fulfillment.addressDetail ?? '';
    this.createdAt = fulfillment.createdAt;
    this.updatedAt = fulfillment.updatedAt;
    this.fulfillmentCompany = fulfillment.fulfillmentCompany ? new FulfillmentCompanyDTO(fulfillment.fulfillmentCompany) : null;

    const defaultDeliveryCompany =
      (fulfillment.deliveryCompanySettings ?? []).find(({ isDefault }) => isDefault === true)?.deliveryCompany ?? null;

    this.defaultDeliveryCompany = defaultDeliveryCompany ? new DeliveryCompanyDTO(defaultDeliveryCompany) : null;
  }
}

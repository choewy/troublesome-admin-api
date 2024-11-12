import { ApiResponseProperty } from '@nestjs/swagger';

import { User } from '../user.entity';

import { FulfillmentDTO } from '@/application/fulfillment/dto/fulfillment.dto';
import { PartnerDTO } from '@/application/partner/dto/patner.dto';
import { RoleDTO } from '@/application/role/dto/role.dto';

export class UserDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: [RoleDTO] })
  roles: RoleDTO[];

  @ApiResponseProperty({ type: PartnerDTO })
  partner: PartnerDTO | null;

  @ApiResponseProperty({ type: FulfillmentDTO })
  fulfillment: FulfillmentDTO | null;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;

    if (Array.isArray(user.roleJoin)) {
      this.roles = user.roleJoin.map(({ role }) => new RoleDTO(role));
    }

    this.partner = user.partner ? new PartnerDTO(user.partner) : null;
    this.fulfillment = user.fulfillment ? new FulfillmentDTO(user.fulfillment) : null;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

import { ApiResponseProperty } from '@nestjs/swagger';

import { User } from '../user.entity';

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

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

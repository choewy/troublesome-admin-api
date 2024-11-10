import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePermissionKey } from '../enums';
import { Role } from '../role.entity';

import { UserDTO } from '@/application/user/dto/user.dto';

export class RoleDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: [String], enum: RolePermissionKey })
  permissions: RolePermissionKey[];

  @ApiResponseProperty({ type: [UserDTO] })
  users: UserDTO[];

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;

    if (Array.isArray(role.permissions)) {
      this.permissions = role.permissions.map(({ key }) => key);
    }

    if (Array.isArray(role.userJoin)) {
      this.users = role.userJoin.map(({ user }) => new UserDTO(user));
    }

    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
  }
}

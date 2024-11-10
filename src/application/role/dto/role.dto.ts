import { ApiResponseProperty } from '@nestjs/swagger';

import { RolePermissionKey } from '../enums';
import { Role } from '../role.entity';

export class RoleDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: [String], enum: RolePermissionKey })
  permissions: RolePermissionKey[];

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.permissions = role.permisisons.map(({ key }) => key);
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
  }
}

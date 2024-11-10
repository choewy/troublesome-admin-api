import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import { RolePermissionKey } from '../enums';

export class CreateRoleDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [String], enum: RolePermissionKey })
  @IsEnum(RolePermissionKey, { each: true })
  @IsArray()
  @IsNotEmpty()
  permissions: RolePermissionKey[];
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { RolePermissionKey } from '../enums';

import { ToString } from '@/constant/transformers';

export class UpdateRolePermissionsDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: [String], enum: RolePermissionKey })
  @IsEnum(RolePermissionKey, { each: true })
  @IsArray()
  @IsOptional()
  remove?: RolePermissionKey[];

  @ApiPropertyOptional({ type: [String], enum: RolePermissionKey })
  @IsEnum(RolePermissionKey, { each: true })
  @IsArray()
  @IsOptional()
  append?: RolePermissionKey[];
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { RolePermissionKey } from '../enums';

import { ToString } from '@/constant/transformers';

export class UpdateRoleDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: [String], enum: RolePermissionKey })
  @IsEnum(RolePermissionKey, { each: true })
  @IsArray()
  @IsOptional()
  permissions: RolePermissionKey[];
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { ToString, ToStringArray } from '@/constant/transformers';

export class UpdateRoleUsersDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  @ToStringArray()
  remove: string[];

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  @ToStringArray()
  append: string[];
}

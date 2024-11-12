import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { ToString, ToStringArray } from '@/constant/transformers';

export class UpdateFulfillmentGroupFulfillmentsDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsNumberString({}, { each: true })
  @IsArray()
  @IsOptional()
  @ToStringArray()
  remove?: string[];

  @ApiPropertyOptional({ type: [Number] })
  @IsNumberString({}, { each: true })
  @IsArray()
  @IsOptional()
  @ToStringArray()
  append?: string[];
}

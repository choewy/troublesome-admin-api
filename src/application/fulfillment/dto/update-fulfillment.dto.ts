import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class UpdateFulfillmentDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class UpdatePartnerGroupDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name?: string;
}

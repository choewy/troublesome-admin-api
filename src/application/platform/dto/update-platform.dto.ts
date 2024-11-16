import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNotIn, IsNumberString, IsOptional, IsString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class UpdatePlatformDTO {
  @ApiProperty({ type: BigInt, description: '플랫폼 PK' })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  id: string;

  @ApiPropertyOptional({ type: String, description: '플랫폼명' })
  @IsString()
  @IsNotIn([null])
  @IsOptional()
  name?: string;
}

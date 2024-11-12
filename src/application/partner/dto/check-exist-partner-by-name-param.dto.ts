import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class CheckExistPartnerByNameParamDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  partnerGroupId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

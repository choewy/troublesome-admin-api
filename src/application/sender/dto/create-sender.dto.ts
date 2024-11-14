import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class CreateSenderDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  fulfillmentId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class CreateFulfillmentDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  fulfillmentGroupId: string;
}

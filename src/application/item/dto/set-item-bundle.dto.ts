import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class SetItemBundleDTO {
  @ApiProperty({ type: BigInt, description: '구성품목 PK' })
  @IsNumberString()
  @IsNotEmpty()
  @ToString()
  itemId: string;

  @ApiProperty({ type: Number, description: '구성품목수량' })
  @IsNumber()
  @IsNotEmpty()
  itemCount: number;
}

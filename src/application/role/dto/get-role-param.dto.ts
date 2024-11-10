import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class GetRoleParamDTO {
  @ApiProperty({ type: BigInt })
  @IsNotEmpty()
  @ToString()
  id: string;
}

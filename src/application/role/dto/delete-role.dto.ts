import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

import { ToString } from '@/constant/transformers';

export class DeleteRoleDTO {
  @ApiProperty({ type: BigInt })
  @IsNumberString()
  @ToString()
  id: string;
}

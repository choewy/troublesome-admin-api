import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString } from 'class-validator';

import { ToStringArray } from '@/constant/transformers';

export class DeleteRolesDTO {
  @ApiProperty({ type: [BigInt] })
  @IsNumberString({}, { each: true })
  @IsArray()
  @ToStringArray()
  ids: string[];
}

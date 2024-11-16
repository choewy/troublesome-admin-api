import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString } from 'class-validator';

import { ToStringArray } from '@/constant/transformers';

export class DeleteItemsDTO {
  @ApiProperty({ type: [Number] })
  @IsNumberString({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  @ToStringArray()
  ids: string[];
}

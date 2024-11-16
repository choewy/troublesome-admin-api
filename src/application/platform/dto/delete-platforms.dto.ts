import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString } from 'class-validator';

import { ToStringArray } from '@/constant/transformers';

export class DeletePlatformsDTO {
  @ApiProperty({ type: [Number] })
  @IsNumberString({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  @ToStringArray()
  ids: string[];
}

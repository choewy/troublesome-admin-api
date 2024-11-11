import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckExistPartnerGroupByNameParamDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

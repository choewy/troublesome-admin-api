import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePartnerGroupDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

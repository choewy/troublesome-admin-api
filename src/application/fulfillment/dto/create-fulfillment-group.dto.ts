import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFulfillmentGroupDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

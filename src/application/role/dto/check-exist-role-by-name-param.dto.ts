import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckExistRoleByNameParamDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;
}

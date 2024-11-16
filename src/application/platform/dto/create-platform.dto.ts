import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlatformDTO {
  @ApiProperty({ type: String, description: '플랫폼명' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

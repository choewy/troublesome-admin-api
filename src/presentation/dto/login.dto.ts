import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { LoginInput } from '@/application/interfaces';

export class LoginDTO implements LoginInput {
  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

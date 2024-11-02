import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { LoginInput } from '@/application/interfaces';
import { UserType } from '@/domain';

export class LoginDTO implements LoginInput {
  @ApiProperty({ type: String, enum: UserType })
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

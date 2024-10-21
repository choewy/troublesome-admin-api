import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreatePartnerCompanyDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  president?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  fax?: string;

  @ApiPropertyOptional({ type: String, format: 'email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: String, format: 'url' })
  @IsUrl()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @Length(5, 6)
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  addressDetail?: string;
}

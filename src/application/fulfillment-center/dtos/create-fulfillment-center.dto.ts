import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class CreateFulfillmentCenterDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  plantCode: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  fulfillmentCompanyId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  deliveryCompanyId: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  consignerName?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  consignerTel?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  consignerPhone?: string;

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

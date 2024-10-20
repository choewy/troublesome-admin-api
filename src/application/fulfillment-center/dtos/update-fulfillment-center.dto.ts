import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateFulfillmentCenterDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  plantCode?: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  fulfillmentCompanyId?: number;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  deliveryCompanyId?: number;

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

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryCompanyDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  alias?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

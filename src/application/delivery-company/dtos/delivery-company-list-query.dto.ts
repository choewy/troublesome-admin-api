import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { ListQueryBuilder, StringToBoolean } from '@/common';

export class DeliveryCompanyListQueryDTO extends ListQueryBuilder() {
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
  @StringToBoolean()
  isActive?: boolean;
}

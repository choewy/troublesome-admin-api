import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ListQueryBuilder } from '@/common';

export class FulfillmentCenterListQueryDTO extends ListQueryBuilder() {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  plantCode?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  fulfullmentCompanyName?: string;
}

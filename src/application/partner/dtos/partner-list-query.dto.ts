import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ListQueryBuilder } from '@/common';

export class PartnerListQueryDTO extends ListQueryBuilder() {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  president?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  partnerCompanyName?: string;
}

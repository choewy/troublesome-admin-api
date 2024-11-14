import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PurchaserSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetPurchaserListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: PurchaserSearchKeywordField })
  @IsOptional()
  field?: PurchaserSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

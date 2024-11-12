import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { FulfillmentGroupSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetFulfillmentGroupListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: FulfillmentGroupSearchKeywordField })
  @IsOptional()
  field?: FulfillmentGroupSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

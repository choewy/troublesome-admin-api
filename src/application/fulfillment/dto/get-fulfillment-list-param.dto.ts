import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { FulfillmentSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetFulfillmentListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: FulfillmentSearchKeywordField })
  @IsOptional()
  field?: FulfillmentSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

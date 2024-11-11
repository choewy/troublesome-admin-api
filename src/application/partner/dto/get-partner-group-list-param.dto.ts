import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PartnerGroupSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetPartnerGroupListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: PartnerGroupSearchKeywordField })
  @IsOptional()
  field?: PartnerGroupSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

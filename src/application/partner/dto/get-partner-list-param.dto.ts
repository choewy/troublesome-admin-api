import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PartnerSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetPartnerListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: PartnerSearchKeywordField })
  @IsOptional()
  field?: PartnerSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

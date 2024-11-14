import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { SenderSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetSenderListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: SenderSearchKeywordField })
  @IsOptional()
  field?: SenderSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { ItemSearchKeywordField, ItemType, ItemUnit } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetItemListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: ItemType })
  @IsOptional()
  type?: ItemType;

  @ApiPropertyOptional({ type: String, enum: ItemUnit })
  @IsOptional()
  unit?: ItemUnit;

  @ApiPropertyOptional({ type: String, enum: ItemSearchKeywordField })
  @IsOptional()
  field?: ItemSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { RoleSearchKeywordField } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetRoleListParamDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: RoleSearchKeywordField })
  @IsOptional()
  field?: RoleSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

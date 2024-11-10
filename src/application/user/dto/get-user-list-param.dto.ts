import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UserType } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetUserListParamsDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: UserType })
  @IsOptional()
  type?: UserType;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  email?: string;
}

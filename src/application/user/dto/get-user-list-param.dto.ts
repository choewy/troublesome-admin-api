import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { UserSearchKeywordField, UserStatus, UserType } from '../enums';

import { ListParam } from '@/common/builder/list-param';

export class GetUserListParamsDTO extends ListParam {
  @ApiPropertyOptional({ type: String, enum: UserType })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @ApiPropertyOptional({ type: String, enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ type: String, enum: UserSearchKeywordField })
  @IsOptional()
  field?: UserSearchKeywordField;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  keyword?: string;
}

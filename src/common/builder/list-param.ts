import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ListParam {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip: number = 0;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take: number = 100;
}

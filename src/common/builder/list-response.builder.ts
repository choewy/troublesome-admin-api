import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

import { ListParam } from './list-param';

export const ListResponseBuilder = <Entity, DTO = any>(DtoClass: Type<DTO>) => {
  class ListResponse {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: Number })
    skip: number;

    @ApiResponseProperty({ type: Number })
    take: number;

    @ApiResponseProperty({ type: [DtoClass] })
    rows: DTO[];

    constructor(rows: Entity[], total: number, param?: ListParam) {
      this.total = total;
      this.skip = param?.skip;
      this.take = param?.take;
      this.rows = rows.map((row) => new DtoClass(row));
    }
  }

  return ListResponse;
};

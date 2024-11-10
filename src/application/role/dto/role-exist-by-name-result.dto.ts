import { ApiResponseProperty } from '@nestjs/swagger';

export class RoleExistByNameResultDTO {
  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Boolean })
  has: boolean;

  constructor(name: string, has: boolean) {
    this.name = name;
    this.has = has;
  }
}

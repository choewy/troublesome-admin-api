import { ApiResponseProperty } from '@nestjs/swagger';

import { Platform } from '../platform.entity';

export class PlatformDTO {
  @ApiResponseProperty({ type: BigInt })
  id: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(platform: Platform) {
    this.id = platform.id;
    this.name = platform.name;
    this.createdAt = platform.createdAt;
    this.updatedAt = platform.updatedAt;
  }
}

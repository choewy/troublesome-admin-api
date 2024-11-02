import { ApiResponseProperty } from '@nestjs/swagger';

import { JwtReturn } from '@/application/interfaces';

export class JwtDTO implements JwtReturn {
  @ApiResponseProperty({ type: String })
  accessToken: string;

  @ApiResponseProperty({ type: String })
  refreshToken: string;
}

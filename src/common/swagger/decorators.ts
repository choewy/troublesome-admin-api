import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { RequestHeader, ResponseHeader } from '@/constant/enums';

export const ApiCutomHeaders = () =>
  applyDecorators(
    ApiBearerAuth(RequestHeader.AccessToken),
    ApiSecurity(RequestHeader.RefreshToken),
    ApiResponse({
      headers: {
        [ResponseHeader.RequestId]: { description: '요청 ID', schema: { type: 'string' } },
        [ResponseHeader.AccessToken]: { description: '갱신된 AccessToken', schema: { type: 'string' } },
        [ResponseHeader.RefreshToken]: { description: '갱신된 RefreshToken', schema: { type: 'string' } },
      },
    }),
  );

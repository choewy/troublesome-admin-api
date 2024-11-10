import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiSecurity } from '@nestjs/swagger';

import { MetadataKey, RequestHeader, ResponseHeader } from './enums';

export const Public = () => SetMetadata(MetadataKey.IsPublic, true);
export const Private = () =>
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

export const Permission = <T>(...permissions: T[]) => applyDecorators(SetMetadata(MetadataKey.Permission, permissions));

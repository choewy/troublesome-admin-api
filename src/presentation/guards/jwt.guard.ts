import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from '@/application/services';
import { MetadataKey, RequestHeader, ResponseHeader } from '@/constant';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(MetadataKey.Public, [context.getClass(), context.getHandler]);

    if (isPublic) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const accessToken = (request.headers.authorization ?? '').replace('Bearer ', '');
    const refreshToken = (request.headers[RequestHeader.RefreshToken] ?? '') as string;
    const jwtReturn = await this.authService.validateTokens(accessToken, refreshToken);

    response.setHeader(ResponseHeader.AccessToken, jwtReturn.accessToken);
    response.setHeader(ResponseHeader.RefreshToken, jwtReturn.refreshToken);

    return true;
  }
}

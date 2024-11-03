import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { AuthService } from '../auth.service';

import { ContextService } from '@/common/context/context.service';
import { MetadataKey, RequestHeader, ResponseHeader } from '@/constant/enums';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(MetadataKey.IsPublic, [context.getClass(), context.getHandler()]);

    if (isPublic) {
      return true;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const accessToken = (request.headers[RequestHeader.AccessToken] ?? '').replace('Bearer ', '');
    const refreshToken = (request.headers[RequestHeader.RefreshToken] ?? '') as string;
    const validateResult = await this.authService.validateTokens(accessToken, refreshToken);

    if (validateResult.expired) {
      const tokens = await this.authService.issueTokens(validateResult.user);

      response.setHeader(ResponseHeader.AccessToken, tokens.accessToken);
      response.setHeader(ResponseHeader.RefreshToken, tokens.refreshToken);
    }

    this.contextService.setRequestUser(validateResult.user);

    return true;
  }
}

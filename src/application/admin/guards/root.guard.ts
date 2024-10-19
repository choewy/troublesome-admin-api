import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CannotAccessException } from '../exceptions';

import { isRoot } from '@/common';
import { ContextService } from '@/core';

@Injectable()
export class RootGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isRoot(this.reflector, context) === false) {
      return true;
    }

    if (this.contextService.getRequestUser()?.isRoot === true) {
      return true;
    }

    throw new CannotAccessException();
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AdminService } from '../admin.service';
import { CannotAccessException } from '../exceptions';

import { isRoot } from '@/common';

@Injectable()
export class RootGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isRoot(this.reflector, context) === false) {
      return true;
    }

    if (this.adminService.isRoot()) {
      return true;
    }

    throw new CannotAccessException();
  }
}

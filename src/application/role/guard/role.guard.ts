import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '@/application/user/user.entity';
import { ContextService } from '@/common/context/context.service';
import { MetadataKey } from '@/constant/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: ContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(MetadataKey.IsPublic, [context.getClass(), context.getHandler()]);

    if (isPublic) {
      return true;
    }

    const permissionKeys = this.reflector.getAllAndOverride(MetadataKey.Permission, [context.getClass(), context.getHandler()]);

    if (Array.isArray(permissionKeys) === false) {
      return true;
    }

    const user = this.contextService.getRequestUser<User>();

    if (Array.isArray(user.roleJoin) === false) {
      throw new ForbiddenException();
    }

    for (const roleJoin of user.roleJoin) {
      for (const permission of roleJoin.role.permissions) {
        if (permissionKeys.includes(permission.key)) {
          return true;
        }
      }
    }

    throw new ForbiddenException();
  }
}

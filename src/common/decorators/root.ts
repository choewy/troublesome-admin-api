import { applyDecorators, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SetMetadataKey } from '../enums';

export const Root = () => applyDecorators(SetMetadata(SetMetadataKey.Root, true));

export const isRoot = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride(SetMetadataKey.Root, [context.getClass(), context.getHandler()]) === true;

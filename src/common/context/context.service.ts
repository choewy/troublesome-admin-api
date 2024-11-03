import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextPropertyKey } from './enums';

@Injectable()
export class ContextService {
  constructor(private readonly clsService: ClsService) {}

  getRequestID() {
    return this.clsService.get(ContextPropertyKey.RequestId);
  }

  getRequestUser<T = any>(): T | null {
    return this.clsService.get(ContextPropertyKey.RequestUser) ?? null;
  }

  getExecutionContext(): ExecutionContext {
    return this.clsService.get(ContextPropertyKey.ExecutionContext) ?? null;
  }

  setRequestUser<T = any>(user: T) {
    this.clsService.set(ContextPropertyKey.RequestUser, user);
  }

  setExecutionContext(executionContext: ExecutionContext) {
    this.clsService.set(ContextPropertyKey.ExecutionContext, executionContext);
  }
}

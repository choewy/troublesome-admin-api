import { ExecutionContext, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ContextPropertyKey } from './enums';
import { RequestUser, RequestUserPartial } from './implements';

@Injectable()
export class ContextService extends ClsService {
  getRequestID() {
    return this.get(ContextPropertyKey.RequestId);
  }

  getRequestUser(): RequestUser<any> | null {
    return this.get(ContextPropertyKey.RequestUser) ?? null;
  }

  getExecutionContext(): ExecutionContext {
    return this.get(ContextPropertyKey.ExecutionContext) ?? null;
  }

  setRequestUser<T extends RequestUserPartial>(user: T) {
    this.set(ContextPropertyKey.RequestUser, new RequestUser(user));
  }

  setExecutionContext(executionContext: ExecutionContext) {
    this.set(ContextPropertyKey.ExecutionContext, executionContext);
  }
}

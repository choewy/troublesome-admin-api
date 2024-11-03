import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { ContextInterceptor } from './context.interceptor';
import { ContextService } from './context.service';
import { ContextPropertyKey } from './enums';

import { RequestHeader, ResponseHeader } from '@/constant/enums';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup(clsService, req, res) {
          req.id = req.get(RequestHeader.RequestId) ?? v4();
          res.set(ResponseHeader.RequestId, req.id);
          clsService.set(ContextPropertyKey.RequestId, req.id);
        },
      },
    }),
  ],
  providers: [ContextService, ContextInterceptor],
  exports: [ContextService, ContextInterceptor],
})
export class ContextModule {}

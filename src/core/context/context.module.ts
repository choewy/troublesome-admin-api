import { DynamicModule, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { ContextPropertyKey } from './enums';

import { RequestHeader, ResponseHeader } from '@/common';

@Module({})
export class ContextModule extends ClsModule {
  public static forRoot(): DynamicModule {
    const dynamicModule = super.forRoot({
      middleware: {
        mount: true,
        setup(clsService, req, res) {
          req.id = req.get(RequestHeader.RequestID) ?? v4();
          res.set(ResponseHeader.RequestID, req.id);
          clsService.set(ContextPropertyKey.RequestId, req.id);
        },
      },
    });

    dynamicModule.global = true;

    return dynamicModule;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ActionLog } from './action-log.schema';
import { User } from '../user/user.entity';

import { ContextService } from '@/common/context/context.service';

@Injectable()
export class ActionLogService {
  constructor(
    @InjectModel(ActionLog.name)
    private readonly actionLogModel: Model<ActionLog>,
    private readonly contextService: ContextService,
  ) {}

  async onApplicationBootstrap() {
    const actionLog = await this.create('init');
    await actionLog.updateOne({ message: 'hello' });
  }

  async create(message: string) {
    const requestId = this.contextService.getRequestID() ?? null;
    const user = this.contextService.getRequestUser<User>() ?? null;
    const partner = user?.partner
      ? {
          id: user.partner.id,
          name: user.partner.name,
        }
      : null;

    const fulfillment = user?.fulfillment
      ? {
          id: user.fulfillment.id,
          name: user.fulfillment.name,
        }
      : null;

    const actionLog = new this.actionLogModel({
      requestId,
      message,
      user: user
        ? {
            id: user.id,
            type: user.type,
            name: user.name,
            email: user.email,
            partner,
            fulfillment,
          }
        : null,
      timestamp: new Date(),
    });

    return actionLog.save();
  }
}

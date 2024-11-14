import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SenderService } from './sender.service';

import { Private } from '@/constant/decorators';

@Private()
@ApiTags('발송인')
@Controller('senders')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}
}

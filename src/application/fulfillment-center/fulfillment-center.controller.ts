import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Private } from '@/common';

@Private()
@ApiTags('풀필먼트 센터')
@Controller('fulfillment/centers')
export class FulfillmentCenterController {
  constructor() {}
}

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FulfillmentService } from './fulfillment.service';

@ApiTags('풀필먼트')
@Controller('fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentSerivce: FulfillmentService) {}
}

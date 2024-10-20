import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeliveryCompanyService } from './delivery-company.service';

import { Private } from '@/common';

@Private()
@ApiTags('택배사')
@Controller('delivery-companies')
export class DeliveryCompanyController {
  constructor(private readonly deliveryCompanyService: DeliveryCompanyService) {}
}

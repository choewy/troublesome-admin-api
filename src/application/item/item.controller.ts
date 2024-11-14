import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ItemService } from './item.service';

import { Private } from '@/constant/decorators';

@Private()
@ApiTags('품목')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
}

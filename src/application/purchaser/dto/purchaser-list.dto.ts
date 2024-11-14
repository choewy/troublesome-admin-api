import { PurchaserDTO } from './purchaser.dto';
import { Purchaser } from '../purchaser.entity';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class PurchaserListDTO extends ListResponseBuilder<Purchaser>(PurchaserDTO) {}

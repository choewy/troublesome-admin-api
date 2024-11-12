import { Fulfillment } from '../fulfillment.entity';
import { FulfillmentDTO } from './fulfillment.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class FulfillmentListDTO extends ListResponseBuilder<Fulfillment>(FulfillmentDTO) {}

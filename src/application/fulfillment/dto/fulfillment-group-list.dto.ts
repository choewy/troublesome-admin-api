import { FulfillmentGroup } from '../fulfillment-group.entity';
import { FulfillmentGroupDTO } from './fulfillment-group.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class FulfillmentGroupListDTO extends ListResponseBuilder<FulfillmentGroup>(FulfillmentGroupDTO) {}

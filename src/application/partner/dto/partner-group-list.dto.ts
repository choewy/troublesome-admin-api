import { PartnerGroupDTO } from './partner-group.dto';
import { PartnerGroup } from '../partner-group.entity';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class PartnerGroupListDTO extends ListResponseBuilder<PartnerGroup>(PartnerGroupDTO) {}

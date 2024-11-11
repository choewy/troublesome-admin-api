import { Partner } from '../partner.entity';
import { PartnerDTO } from './patner.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class PartnerListDTO extends ListResponseBuilder<Partner>(PartnerDTO) {}

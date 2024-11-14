import { SenderDTO } from './sender.dto';
import { Sender } from '../sender.entity';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class SenderListDTO extends ListResponseBuilder<Sender>(SenderDTO) {}

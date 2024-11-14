import { Item } from '../item.entity';
import { ItemDTO } from './item.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class ItemListDTO extends ListResponseBuilder<Item>(ItemDTO) {}

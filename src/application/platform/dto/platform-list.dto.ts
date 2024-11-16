import { Platform } from '../platform.entity';
import { PlatformDTO } from './platform.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class PlatformListDTO extends ListResponseBuilder<Platform>(PlatformDTO) {}

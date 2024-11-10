import { Role } from '../role.entity';
import { RoleDTO } from './role.dto';

import { ListResponseBuilder } from '@/common/builder/list-response.builder';

export class RoleListDTO extends ListResponseBuilder<Role>(RoleDTO) {}

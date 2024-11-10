import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { RoleSearchKeywordField } from './enums';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  private readonly roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {}

  private createRoleSearchKeywordBracket(field: RoleSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case RoleSearchKeywordField.Name:
          qb.orWhere('role.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('role.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getRoleList(params: GetRoleListParamDTO) {
    const builder = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndMapMany('role.permissions', 'role.permissions', 'permissions')
      .where('1 = 1');

    if (params.keyword) {
      builder.andWhere(this.createRoleSearchKeywordBracket(params.field, params.keyword));
    }

    const [roles, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new RoleListDTO(roles, total, params);
  }
}

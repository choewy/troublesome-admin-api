import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, In, Repository } from 'typeorm';

import { CreateRoleDTO } from './dto/create-role.dto';
import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { RoleExistByNameResultDTO } from './dto/role-exist-by-name-result.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RoleSearchKeywordField } from './enums';
import { RolePermission } from './role-permission.entity';
import { RoleUsers } from './role-users.entity';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  private readonly roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
  }

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
      .leftJoinAndMapMany('role.userJoin', 'role.userJoin', 'userJoin')
      .leftJoinAndMapOne('userJoin.user', 'userJoin.user', 'user')
      .where('1 = 1');

    if (params.keyword) {
      builder.andWhere(this.createRoleSearchKeywordBracket(params.field, params.keyword));
    }

    const [roles, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new RoleListDTO(roles, total, params);
  }

  async checkExistRoleByName(name: string) {
    return new RoleExistByNameResultDTO(name, (await this.roleRepository.countBy({ name })) > 0);
  }

  async createRole(body: CreateRoleDTO) {
    await this.roleRepository.save({
      name: body.name,
      permissions: body.permissions.map((key) => ({ key })),
    });
  }

  async updateRole(body: UpdateRoleDTO) {
    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(Role);
      const role = await roleRepository.findOne({
        relations: { permissions: true },
        where: { id: body.id },
        lock: { mode: 'pessimistic_write' },
      });

      if (role === null) {
        return;
      }

      if (body.name && body.name !== role.name) {
        await roleRepository.update(body.id, { name: body.name });
      }

      if (Array.isArray(body.permissions)) {
        const rolePermissionRepository = em.getRepository(RolePermission);
        await rolePermissionRepository.delete({ roleId: role.id });
        await rolePermissionRepository.insert(body.permissions.map((key) => ({ key, role })));
      }
    });
  }

  async deleteRoles(ids: string[]) {
    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(Role);
      await roleRepository.softDelete({ id: In(['0'].concat(ids)) });

      const rolePermissionRepository = em.getRepository(RolePermission);
      await rolePermissionRepository.delete({ roleId: In(['0'].concat(ids)) });

      const roleUsersRepository = em.getRepository(RoleUsers);
      await roleUsersRepository.delete({ roleId: In(['0'].concat(ids)) });
    });
  }
}

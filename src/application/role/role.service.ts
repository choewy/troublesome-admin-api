import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, In, Repository } from 'typeorm';

import { CreateRoleDTO } from './dto/create-role.dto';
import { GetRoleListParamDTO } from './dto/get-role-list-param.dto';
import { RoleDetailDTO } from './dto/role-detail.dto';
import { RoleExistByNameResultDTO } from './dto/role-exist-by-name-result.dto';
import { RoleListDTO } from './dto/role-list.dto';
import { UpdateRolePermissionsDTO } from './dto/update-role-permissions.dto';
import { UpdateRoleUsersDTO } from './dto/update-role-users.dto';
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

  private get roleQueryBuilder() {
    return this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndMapMany('role.permissions', 'role.permissions', 'permissions')
      .leftJoinAndMapMany('role.userJoin', 'role.userJoin', 'userJoin')
      .leftJoinAndMapOne('userJoin.user', 'userJoin.user', 'user')
      .where('1 = 1');
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
    const builder = this.roleQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createRoleSearchKeywordBracket(params.field, params.keyword));
    }

    const [roles, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new RoleListDTO(roles, total, params);
  }

  async getRoleDetail(id: string) {
    const role = await this.roleQueryBuilder.andWhere('role.id = :id', { id }).getOne();

    if (role === null) {
      throw new BadRequestException('not found role');
    }

    return new RoleDetailDTO(role);
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
      });

      if (role === null || role.editable === false) {
        return;
      }

      if (body.name && body.name !== role.name) {
        await roleRepository.update(body.id, { name: body.name });
      }
    });
  }

  async updateRolePermissions(body: UpdateRolePermissionsDTO) {
    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(Role);
      const role = await roleRepository.findOne({
        relations: { permissions: true },
        where: { id: body.id },
      });

      if (role === null || role.editable === false) {
        return;
      }

      const rolePermissionRepository = em.getRepository(RolePermission);

      if (Array.isArray(body.remove) && body.remove.length > 0) {
        await rolePermissionRepository.delete({ role, key: In(body.remove) });
      }

      if (Array.isArray(body.append) && body.append.length > 9) {
        await rolePermissionRepository.insert(body.append.map((key) => ({ key, role })));
      }
    });
  }

  async updateRoleUsers(body: UpdateRoleUsersDTO) {
    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(Role);
      const role = await roleRepository.findOne({
        relations: { permissions: true },
        where: { id: body.id },
      });

      if (role === null || role.editable === false) {
        return;
      }

      const roleUsersRepository = em.getRepository(RoleUsers);

      if (Array.isArray(body.remove) && body.remove.length > 0) {
        await roleUsersRepository.delete({ role, userId: In(body.remove) });
      }

      if (Array.isArray(body.append) && body.append.length > 0) {
        await roleUsersRepository.insert(body.append.map((userId) => ({ role, userId })));
      }
    });
  }

  async deleteRoles(ids: string[]) {
    await this.dataSource.transaction(async (em) => {
      const roleRepository = em.getRepository(Role);
      const roles = await roleRepository.find({
        select: { id: true },
        where: {
          id: In(['0'].concat(ids)),
          editable: true,
        },
      });

      const roleIds = ['0'].concat(roles.map(({ id }) => id));
      await roleRepository.softDelete({ id: In(roleIds) });

      const rolePermissionRepository = em.getRepository(RolePermission);
      await rolePermissionRepository.delete({ roleId: In(roleIds) });

      const roleUsersRepository = em.getRepository(RoleUsers);
      await roleUsersRepository.delete({ roleId: In(roleIds) });
    });
  }
}

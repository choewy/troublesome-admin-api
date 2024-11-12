import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, In, Repository } from 'typeorm';

import { CreateFulfillmentGroupDTO } from './dto/create-fulfillment-group.dto';
import { CreateFulfillmentDTO } from './dto/create-fulfillment.dto';
import { FulfillmentExistByNameResultDTO } from './dto/fulfillment-exist-by-name-result.dto';
import { FulfillmentGroupExistByNameResultDTO } from './dto/fulfillment-group-exist-by-name-result.dto';
import { FulfillmentGroupListDTO } from './dto/fulfillment-group-list.dto';
import { FulfillmentGroupDTO } from './dto/fulfillment-group.dto';
import { FulfillmentListDTO } from './dto/fulfillment-list.dto';
import { FulfillmentDTO } from './dto/fulfillment.dto';
import { GetFulfillmentGroupListParamDTO } from './dto/get-fulfillment-group-list-param.dto';
import { GetFulfillmentListParamDTO } from './dto/get-fulfillment-list-param.dto';
import { UpdateFulfillmentGroupFulfillmentsDTO } from './dto/update-fulfillment-group-fulfillments.dto';
import { UpdateFulfillmentGroupDTO } from './dto/update-fulfillment-group.dto';
import { UpdateFulfillmentUsersDTO } from './dto/update-fulfillment-users.dto';
import { UpdateFulfillmentDTO } from './dto/update-fulfillment.dto';
import { FulfillmentGroupSearchKeywordField, FulfillmentSearchKeywordField } from './enums';
import { FulfillmentGroup } from './fulfillment-group.entity';
import { Fulfillment } from './fulfillment.entity';
import { User } from '../user/user.entity';

@Injectable()
export class FulfillmentService {
  private readonly fulfillmentGroupRepository: Repository<FulfillmentGroup>;
  private readonly fulfillmentRepository: Repository<Fulfillment>;

  constructor(private readonly dataSource: DataSource) {
    this.fulfillmentGroupRepository = this.dataSource.getRepository(FulfillmentGroup);
    this.fulfillmentRepository = this.dataSource.getRepository(Fulfillment);
  }

  private get fulfillmentGroupQueryBuilder() {
    return this.fulfillmentGroupRepository
      .createQueryBuilder('fulfillmentGroup')
      .leftJoinAndMapMany('fulfillmentGroup.partners', 'fulfillmentGroup.partners', 'fulfillments')
      .where('1 = 1');
  }

  private createFulfillmentGroupSearchKeywordBracket(field: FulfillmentGroupSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case FulfillmentGroupSearchKeywordField.Name:
          qb.orWhere('fulfillmentGroup.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('fulfillmentGroup.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getFulfillmentGroupList(params: GetFulfillmentGroupListParamDTO) {
    const builder = this.fulfillmentGroupQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createFulfillmentGroupSearchKeywordBracket(params.field, params.keyword));
    }

    const [fulfillmentGroups, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new FulfillmentGroupListDTO(fulfillmentGroups, total, params);
  }

  async checkExistFulfillmentGroupByName(name: string) {
    return new FulfillmentGroupExistByNameResultDTO(name, (await this.fulfillmentGroupRepository.countBy({ name })) > 0);
  }

  async getFulfillmentGroupDetail(id: string) {
    const fulfillmentGroup = await this.fulfillmentGroupQueryBuilder.andWhere('fulfillmentGroup.id = :id', { id }).getOne();

    if (fulfillmentGroup === null) {
      throw new BadRequestException('not found fulfillment group');
    }

    return new FulfillmentGroupDTO(fulfillmentGroup);
  }

  async createFulfillmentGroup(body: CreateFulfillmentGroupDTO) {
    await this.fulfillmentGroupRepository.save({
      name: body.name,
    });
  }

  async updateFulfillmentGroup(body: UpdateFulfillmentGroupDTO) {
    const fulfillmentGroup = await this.fulfillmentGroupRepository.findOne({
      where: { id: body.id },
    });

    if (fulfillmentGroup === null || !body.name || body.name === fulfillmentGroup.name) {
      return;
    }

    await this.fulfillmentGroupRepository.update(body.id, { name: body.name });
  }

  async updateFulfillmentGroupFulfillments(body: UpdateFulfillmentGroupFulfillmentsDTO) {
    await this.dataSource.transaction(async (em) => {
      const fulfillmentGroupRepository = em.getRepository(FulfillmentGroup);
      const fulfillmentGroup = await fulfillmentGroupRepository.findOneBy({ id: body.id });

      if (fulfillmentGroup === null) {
        return;
      }

      const fulfillmentRepository = em.getRepository(Fulfillment);

      if (Array.isArray(body.remove) && body.remove.length > 0) {
        await fulfillmentRepository.update({ id: In(body.remove) }, { fulfillmentGroup: null });
      }

      if (Array.isArray(body.append) && body.append.length > 9) {
        await fulfillmentRepository.update({ id: In(body.append) }, { fulfillmentGroup });
      }
    });
  }

  async deleteFulfillmentGroups(ids: string[]) {
    await this.dataSource.transaction(async (em) => {
      const fulfillmentGroupRepository = em.getRepository(FulfillmentGroup);
      const fulfillmentGroups = await fulfillmentGroupRepository.find({
        select: { id: true },
        where: { id: In(['0'].concat(ids)) },
      });

      const fulfillmentGroupIds = ['0'].concat(fulfillmentGroups.map(({ id }) => id));
      await fulfillmentGroupRepository.softDelete({ id: In(fulfillmentGroupIds) });

      const fulfillmentRepository = em.getRepository(Fulfillment);
      await fulfillmentRepository.update({ fulfillmentGroupId: In(fulfillmentGroupIds) }, { fulfillmentGroupId: null });
    });
  }

  private get fulfillmentQueryBuilder() {
    return this.fulfillmentRepository
      .createQueryBuilder('fulfillment')
      .leftJoinAndMapMany('fulfillment.fulfillmentGroup', 'fulfillment.fulfillmentGroup', 'fulfillmentGroup')
      .where('1 = 1');
  }

  private createFulfillmentSearchKeywordBracket(field: FulfillmentSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case FulfillmentSearchKeywordField.Name:
          qb.orWhere('fulfillment.name LIKE "%:keyword%"', { keyword });

          break;

        case FulfillmentSearchKeywordField.GroupName:
          qb.orWhere('fulfillmentGroup.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('fulfillment.name LIKE "%:keyword%"', { keyword });
          qb.orWhere('fulfillmentGroup.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getFulfillmentList(params: GetFulfillmentListParamDTO) {
    const builder = this.fulfillmentQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createFulfillmentSearchKeywordBracket(params.field, params.keyword));
    }

    const [fulfillments, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new FulfillmentListDTO(fulfillments, total, params);
  }

  async getFulfillmentDetail(id: string) {
    const fulfillment = await this.fulfillmentQueryBuilder.andWhere('fulfillment.id = :id', { id }).getOne();

    if (fulfillment === null) {
      throw new BadRequestException('not found fulfillment');
    }

    return new FulfillmentDTO(fulfillment);
  }

  async checkExistFulfillmentByName(fulfillmentGroupId: string, name: string) {
    return new FulfillmentExistByNameResultDTO(
      fulfillmentGroupId,
      name,
      (await this.fulfillmentRepository.countBy({ fulfillmentGroupId, name })) > 0,
    );
  }

  async createFulfillment(body: CreateFulfillmentDTO) {
    await this.fulfillmentRepository.save({
      fulfillmentGroupId: body.fulfillmentGroupId,
      name: body.name,
    });
  }

  async updateFulfillment(body: UpdateFulfillmentDTO) {
    const fulfillment = await this.fulfillmentRepository.findOneBy({ id: body.id });

    if (fulfillment === null || !body.name || body.name === fulfillment.name) {
      return;
    }

    await this.fulfillmentRepository.update(body.id, { name: body.name });
  }

  async updateFulfillmentUsers(body: UpdateFulfillmentUsersDTO) {
    await this.dataSource.transaction(async (em) => {
      const fulfillmentRepository = em.getRepository(Fulfillment);
      const fulfillment = await fulfillmentRepository.findOneBy({ id: body.id });

      if (fulfillment === null) {
        return;
      }

      const userRepository = em.getRepository(User);

      if (Array.isArray(body.remove) && body.remove.length > 0) {
        await userRepository.update({ id: In(body.remove) }, { fulfillment: null });
      }

      if (Array.isArray(body.append) && body.append.length > 9) {
        await userRepository.update({ id: In(body.append) }, { fulfillment });
      }
    });
  }

  async deleteFulfillments(ids: string[]) {
    await this.dataSource.transaction(async (em) => {
      const fulfillmentRepository = em.getRepository(Fulfillment);
      const fulfillments = await fulfillmentRepository.find({
        select: { id: true },
        where: { id: In(['0'].concat(ids)) },
      });

      const fulfillmentIds = ['0'].concat(fulfillments.map(({ id }) => id));
      await fulfillmentRepository.softDelete({ id: In(fulfillmentIds) });

      const userRepository = em.getRepository(User);
      await userRepository.update({ fulfillmentId: In(fulfillmentIds) }, { fulfillment: null });
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Not, Repository } from 'typeorm';

import {
  CreateDeliveryCompanyDTO,
  DeliveryCompanyDTO,
  DeliveryCompanyListDTO,
  DeliveryCompanyListQueryDTO,
  UpdateDeliveryCompanyDTO,
} from './dtos';
import { AlreadyExistDeliveryCompanyAliasException, NotFoundDeliveryCompanyException } from './exceptions';

import { toBoolean, toNull, toUndefined } from '@/common';
import { DeliveryCompanyEntity } from '@/libs';

@Injectable()
export class DeliveryCompanyService {
  constructor(
    @InjectRepository(DeliveryCompanyEntity)
    private readonly deliveryCompanyRepository: Repository<DeliveryCompanyEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(DeliveryCompanyEntity) : this.deliveryCompanyRepository;
  }

  async getList(query: DeliveryCompanyListQueryDTO) {
    return new DeliveryCompanyListDTO(
      await this.deliveryCompanyRepository.findAndCount({
        where: {
          name: query.name ? Like(`%${query.name}%`) : undefined,
          alias: query.alias ? Like(`%${query.alias}%`) : undefined,
          isActive: typeof query.isActive === 'boolean' ? query.isActive : undefined,
        },
      }),
    );
  }

  async getById(id: number) {
    const deliveryCompany = await this.findById(id);

    if (deliveryCompany === null) {
      throw new NotFoundDeliveryCompanyException();
    }

    return new DeliveryCompanyDTO(deliveryCompany);
  }

  async create(body: CreateDeliveryCompanyDTO) {
    if (await this.hasByAlias(body.alias)) {
      throw new AlreadyExistDeliveryCompanyAliasException();
    }

    await this.deliveryCompanyRepository.insert({
      name: body.name,
      alias: body.alias,
      isActive: false,
    });
  }

  async updateById(id: number, body: UpdateDeliveryCompanyDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundDeliveryCompanyException();
    }

    if (body.alias && (await this.hasByAlias(body.alias, id))) {
      throw new AlreadyExistDeliveryCompanyAliasException();
    }

    await this.deliveryCompanyRepository.update(id, {
      name: toUndefined(toNull(body.name)),
      alias: toUndefined(toNull(body.alias)),
      isActive: toUndefined(toBoolean(body.isActive)),
    });
  }

  async deleteById(id: number) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundDeliveryCompanyException();
    }

    await this.deliveryCompanyRepository.save({
      id,
      deliveryCompanySettings: [],
      deletedAt: new Date(),
    });
  }

  async hasById(id: number) {
    return !!(await this.deliveryCompanyRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async hasByAlias(alias: string, omitId?: number) {
    return !!(await this.deliveryCompanyRepository.findOne({
      select: { id: true },
      where: { alias, id: omitId ? Not(omitId) : undefined },
    }));
  }

  async findById(id: number) {
    return this.deliveryCompanyRepository.findOneBy({ id });
  }
}

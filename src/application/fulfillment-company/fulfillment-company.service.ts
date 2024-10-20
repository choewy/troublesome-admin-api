import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';

import {
  CreateFulfillmentCompanyDTO,
  FulfillmentCompanyDTO,
  FulfillmentCompanyListDTO,
  FulfillmentCompanyListQueryDTO,
  UpdateFulfillmentCompanyDTO,
} from './dtos';
import { NotFoundFulfillmentCompanyException } from './exceptions';

import { toUndefinedOrNull } from '@/common';
import { FulfillmentCompanyEntity } from '@/libs';

@Injectable()
export class FulfillmentCompanyService {
  constructor(
    @InjectRepository(FulfillmentCompanyEntity)
    private readonly fulfullmentCompanyRepository: Repository<FulfillmentCompanyEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(FulfillmentCompanyEntity) : this.fulfullmentCompanyRepository;
  }

  async getList(query: FulfillmentCompanyListQueryDTO) {
    return new FulfillmentCompanyListDTO(
      await this.fulfullmentCompanyRepository.findAndCount({
        where: {
          name: query.name ? Like(`%${query.name.trim()}%`) : undefined,
          president: query.president ? Like(`%${query.president.trim()}%`) : undefined,
        },
        skip: query.skip,
        take: query.take,
      }),
    );
  }

  async getById(id: number) {
    const fulfillmentCompany = await this.findById(id);

    if (fulfillmentCompany === null) {
      throw new NotFoundFulfillmentCompanyException();
    }

    return new FulfillmentCompanyDTO(fulfillmentCompany);
  }

  async create(body: CreateFulfillmentCompanyDTO) {
    await this.fulfullmentCompanyRepository.insert({
      name: body.name,
      president: body.president,
      contact: body.contact,
      fax: body.fax,
      email: body.email,
      url: body.url,
      zipCode: body.zipCode,
      address: body.address,
      addressDetail: body.addressDetail,
    });
  }

  async updateById(id: number, body: UpdateFulfillmentCompanyDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundFulfillmentCompanyException();
    }

    await this.fulfullmentCompanyRepository.update(id, {
      name: toUndefinedOrNull(body.name),
      president: toUndefinedOrNull(body.president),
      contact: toUndefinedOrNull(body.contact),
      fax: toUndefinedOrNull(body.fax),
      email: toUndefinedOrNull(body.email),
      url: toUndefinedOrNull(body.url),
      zipCode: toUndefinedOrNull(body.zipCode),
      address: toUndefinedOrNull(body.address),
      addressDetail: toUndefinedOrNull(body.addressDetail),
    });
  }

  async deleteById(id: number) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundFulfillmentCompanyException();
    }

    await this.fulfullmentCompanyRepository.softDelete(id);
  }

  async hasById(id: number) {
    return !!(await this.fulfullmentCompanyRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async findById(id: number) {
    return this.fulfullmentCompanyRepository.findOneBy({ id });
  }
}

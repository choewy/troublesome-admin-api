import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';

import {
  CreatePartnerCompanyDTO,
  PartnerCompanyDTO,
  PartnerCompanyListDTO,
  PartnerCompanyListQueryDTO,
  UpdatePartnerCompanyDTO,
} from './dtos';
import { NotFoundPartnerCompanyException } from './exceptions';

import { toNull, toUndefined, toUndefinedOrNull } from '@/common';
import { PartnerCompanyEntity } from '@/libs';

@Injectable()
export class PartnerCompanyService {
  constructor(
    @InjectRepository(PartnerCompanyEntity)
    private readonly partnerCompanyRepository: Repository<PartnerCompanyEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(PartnerCompanyEntity) : this.partnerCompanyRepository;
  }

  async getList(query: PartnerCompanyListQueryDTO) {
    return new PartnerCompanyListDTO(
      await this.partnerCompanyRepository.findAndCount({
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
    const partnerCompany = await this.findById(id);

    if (partnerCompany === null) {
      throw new NotFoundPartnerCompanyException();
    }

    return new PartnerCompanyDTO(partnerCompany);
  }

  async create(body: CreatePartnerCompanyDTO) {
    await this.partnerCompanyRepository.insert({
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

  async updateById(id: number, body: UpdatePartnerCompanyDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundPartnerCompanyException();
    }

    await this.partnerCompanyRepository.update(id, {
      name: toUndefined(toNull(body.name)),
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
      throw new NotFoundPartnerCompanyException();
    }

    await this.partnerCompanyRepository.softDelete(id);
  }

  async hasById(id: number) {
    return !!(await this.partnerCompanyRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async findById(id: number) {
    return this.partnerCompanyRepository.findOneBy({ id });
  }
}

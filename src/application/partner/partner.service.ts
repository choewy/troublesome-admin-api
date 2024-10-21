import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';

import { CreatePartnerDTO, PartnerDTO, PartnerListDTO, PartnerListQueryDTO, UpdatePartnerDTO } from './dtos';
import { NotFoundPartnerException } from './exceptions';
import { NotFoundPartnerCompanyException, PartnerCompanyService } from '../partner-company';

import { toNull, toUndefined, toUndefinedOrNull } from '@/common';
import { PartnerEntity } from '@/libs';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
    private readonly partnerCompanyService: PartnerCompanyService,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(PartnerEntity) : this.partnerRepository;
  }

  async getList(query: PartnerListQueryDTO) {
    return new PartnerListDTO(
      await this.partnerRepository.findAndCount({
        relations: { partnerCompany: true },
        where: {
          name: query.name ? Like(`%${query.name.trim()}%`) : undefined,
          partnerCompany: query.partnerCompanyName
            ? { name: query.partnerCompanyName ? Like(`%${query.partnerCompanyName.trim()}%`) : undefined }
            : undefined,
        },
        skip: query.skip,
        take: query.take,
      }),
    );
  }

  async getById(id: number) {
    const partner = await this.findById(id);

    if (partner === null) {
      throw new NotFoundPartnerException();
    }

    return new PartnerDTO(partner);
  }

  async create(body: CreatePartnerDTO) {
    if ((await this.partnerCompanyService.hasById(body.partnerCompanyId)) === false) {
      throw new NotFoundPartnerCompanyException();
    }

    await this.partnerRepository.insert({
      name: body.name,
      president: body.president,
      contact: body.contact,
      fax: body.fax,
      email: body.email,
      url: body.url,
      zipCode: body.zipCode,
      address: body.address,
      addressDetail: body.addressDetail,
      partnerCompanyId: body.partnerCompanyId,
    });
  }

  async updateById(id: number, body: UpdatePartnerDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundPartnerException();
    }

    if (body.partnerCompanyId && (await this.partnerCompanyService.hasById(body.partnerCompanyId)) === false) {
      throw new NotFoundPartnerCompanyException();
    }

    await this.partnerRepository.update(id, {
      name: toUndefined(toNull(body.name)),
      president: toUndefinedOrNull(body.president),
      contact: toUndefinedOrNull(body.contact),
      fax: toUndefinedOrNull(body.fax),
      email: toUndefinedOrNull(body.email),
      url: toUndefinedOrNull(body.url),
      zipCode: toUndefinedOrNull(body.zipCode),
      address: toUndefinedOrNull(body.address),
      addressDetail: toUndefinedOrNull(body.addressDetail),
      partnerCompanyId: toUndefined(toNull(body.partnerCompanyId)),
    });
  }

  async deleteById(id: number) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundPartnerException();
    }

    await this.partnerRepository.softDelete(id);
  }

  async hasById(id: number) {
    return !!(await this.partnerRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async findById(id: number) {
    return this.partnerRepository.findOne({
      relations: { partnerCompany: true },
      where: { id },
    });
  }
}

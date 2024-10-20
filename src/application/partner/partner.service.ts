import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreatePartnerDTO, UpdatePartnerDTO } from './dtos';
import { NotFoundPartnerException } from './exceptions';

import { toUndefinedOrNull } from '@/common';
import { PartnerEntity } from '@/libs';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(PartnerEntity) : this.partnerRepository;
  }

  async create(body: CreatePartnerDTO) {
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
    });
  }

  async updateById(id: number, body: UpdatePartnerDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundPartnerException();
    }

    await this.partnerRepository.update(id, {
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
}

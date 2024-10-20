import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

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

  async hasById(id: number) {
    return !!(await this.deliveryCompanyRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }
}

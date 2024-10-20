import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { DeliveryCompanySettingEntity } from '@/libs';

@Injectable()
export class DeliveryCompanySettingService {
  constructor(
    @InjectRepository(DeliveryCompanySettingEntity)
    private readonly deliveryCompanySettingRepository: Repository<DeliveryCompanySettingEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(DeliveryCompanySettingEntity) : this.deliveryCompanySettingRepository;
  }
}

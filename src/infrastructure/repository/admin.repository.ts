import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IRepositoryImpl } from '../abstracts';

import { Admin, AdminRepository, BigIntId } from '@/domain';

@Injectable()
export class AdminRepositoryImpl extends IRepositoryImpl<Admin> implements AdminRepository {
  constructor(entityManager: EntityManager) {
    super(Admin, entityManager);
  }

  async findById(id: BigIntId): Promise<Admin | null> {
    return this.findOne({ where: { id } });
  }
}

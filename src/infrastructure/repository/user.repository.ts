import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IRepositoryImpl } from '../abstracts';

import { BigIntId, User, UserRepository, UserType } from '@/domain';

@Injectable()
export class UserRepositoryImpl extends IRepositoryImpl<User> implements UserRepository {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }

  async findById(id: BigIntId): Promise<User | null> {
    return this.findOneBy({ id });
  }

  async findOneByTypeAndEmail(type: UserType, email: string): Promise<User | null> {
    return this.findOneBy({ type, email });
  }
}

import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IRepositoryImpl } from '../abstracts';

import { User, UserRepository, UserType } from '@/domain';

@Injectable()
export class UserRepositoryImpl extends IRepositoryImpl<User> implements UserRepository {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }

  async findOneByTypeAndEmail(type: UserType, email: string): Promise<User | null> {
    return this.findOneBy({ type, email });
  }
}

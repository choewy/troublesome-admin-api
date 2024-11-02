import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IRepositoryImpl } from '../abstracts';

import { User, UserRepository } from '@/domain';

@Injectable()
export class UserRepositoryImpl extends IRepositoryImpl<User> implements UserRepository {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }
}

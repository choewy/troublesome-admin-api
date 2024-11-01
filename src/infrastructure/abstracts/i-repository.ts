import { Type } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { IRepository } from '@/domain';

export abstract class IRepositoryImpl<E> extends Repository<E> implements IRepository<E> {
  constructor(
    protected readonly Entity: Type<E>,
    protected readonly entityManager: EntityManager,
  ) {
    super(Entity, entityManager);
  }

  async withTransaction<ReturnValue = any>(runInTransaction: (em: EntityManager) => Promise<ReturnValue>) {
    return this.entityManager.transaction(runInTransaction);
  }
}

import { EntityManager, Repository } from 'typeorm';

export interface IRepository<E> extends Repository<E> {
  withTransaction<ReturnValue = any>(runInTransaction: (em: EntityManager) => Promise<ReturnValue>): Promise<ReturnValue>;
}

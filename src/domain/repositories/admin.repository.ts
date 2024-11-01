import { Admin } from '../entities';
import { IRepository } from '../interfaces';
import { BigIntId } from '../vo';

export interface AdminRepository extends IRepository<Admin> {
  findById(id: BigIntId): Promise<Admin | null>;
}

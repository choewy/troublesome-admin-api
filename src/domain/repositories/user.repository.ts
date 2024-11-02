import { User } from '../entities';
import { UserType } from '../enums';
import { IRepository } from '../interfaces';
import { BigIntId } from '../vo';

export interface UserRepository extends IRepository<User> {
  findById(id: BigIntId): Promise<User | null>;
  findOneByTypeAndEmail(type: UserType, email: string): Promise<User | null>;
}

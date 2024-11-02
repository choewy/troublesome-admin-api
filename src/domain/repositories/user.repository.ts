import { User } from '../entities';
import { UserType } from '../enums';
import { IRepository } from '../interfaces';

export interface UserRepository extends IRepository<User> {
  findOneByTypeAndEmail(type: UserType, email: string): Promise<User | null>;
}

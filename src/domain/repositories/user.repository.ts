import { User } from '../entities';
import { IRepository } from '../interfaces';

export interface UserRepository extends IRepository<User> {}

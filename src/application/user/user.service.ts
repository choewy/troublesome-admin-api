import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserType } from './enums';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async getUserByTypeAndEmail(type: UserType, email: string) {
    return this.userRepository.findOne({ where: { type, email } });
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}

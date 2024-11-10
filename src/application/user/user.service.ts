import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm';

import { GetUserListParamsDTO } from './dto/get-user-list-param.dto';
import { UserListDTO } from './dto/user-list.dto';
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

  async getUsersAndCount(params: GetUserListParamsDTO) {
    const where: FindOptionsWhere<User>[] = [];

    if (params.email) {
      where.push({ email: Like(`%${params.email}%`) });
    }

    if (params.name) {
      where.push({ name: Like(`%${params.name}%`) });
    }

    for (const w of where) {
      if (params.type) {
        w.type = params.type;
      }
    }

    const [users, total] = await this.userRepository.findAndCount({
      where,
      skip: params.skip,
      take: params.take,
    });

    return new UserListDTO(users, total, params);
  }
}

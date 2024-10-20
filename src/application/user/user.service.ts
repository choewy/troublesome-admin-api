import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { UserDTO } from './dtos';
import { NotFoundUserException } from './exceptions';

import { UserEntity } from '@/libs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(UserEntity) : this.userRepository;
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async getById(id: number) {
    const user = await this.findById(id);

    if (user === null) {
      throw new NotFoundUserException();
    }

    return new UserDTO(user);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { UserRepository, UserType } from '@/domain';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async getByTypeAndEmail(type: UserType, email: string) {
    return this.userRepository.findOneBy({ type, email });
  }
}

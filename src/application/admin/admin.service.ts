import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminEntity } from '@/libs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async findById(id: number) {
    return this.adminRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.adminRepository.findOneBy({ email });
  }
}

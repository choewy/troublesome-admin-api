import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { CreateAdminDTO } from './dtos';
import { AlreadyExistAdminException, CannotAccessException, PasswordMismatchException } from './exceptions';

import { ContextService } from '@/core';
import { AdminEntity } from '@/libs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly contextService: ContextService,
  ) {}

  async isRoot() {
    const requestUser = this.contextService.getRequestUser();
    const admin = await this.findById(requestUser?.id);

    return admin?.isRoot === true;
  }

  async findById(id: number) {
    if (id == null) {
      return null;
    }

    return this.adminRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    if (email == null) {
      return null;
    }

    return this.adminRepository.findOneBy({ email });
  }

  async hasByEmail(email: string) {
    if (email == null) {
      return false;
    }

    return (await this.adminRepository.countBy({ email })) > 0;
  }

  async create(body: CreateAdminDTO) {
    if ((await this.isRoot()) === false) {
      throw new CannotAccessException();
    }

    if (await this.hasByEmail(body.email)) {
      throw new AlreadyExistAdminException();
    }

    if (body.password !== body.confirmPassword) {
      throw new PasswordMismatchException();
    }

    await this.adminRepository.insert({
      email: body.email,
      name: body.name,
      password: await hash(body.password),
    });
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';

import { CreateAdminDTO } from './dtos';
import { AlreadyExistAdminException, CannotAccessException, PasswordMismatchException } from './exceptions';

import { AdminRootConfigFactory } from '@/common';
import { ContextService } from '@/core';
import { AdminEntity } from '@/libs';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly contextService: ContextService,
    private readonly adminRootConfigFactory: AdminRootConfigFactory,
  ) {}

  async onModuleInit() {
    const value = this.adminRootConfigFactory.value;

    if (await this.hasById(value.id)) {
      return;
    }

    await this.adminRepository.insert({
      id: value.id,
      name: value.name,
      email: value.email,
      password: await hash(value.password),
      isRoot: true,
    });
  }

  async isRoot() {
    const requestUser = this.contextService.getRequestUser();
    const admin = await this.findById(requestUser?.id);

    return admin?.isRoot === true;
  }

  async hasById(id: number) {
    if (id == null) {
      return false;
    }

    return (await this.adminRepository.countBy({ id })) > 0;
  }

  async hasByEmail(email: string) {
    if (email == null) {
      return false;
    }

    return (await this.adminRepository.countBy({ email })) > 0;
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

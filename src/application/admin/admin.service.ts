import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { EntityManager, Repository } from 'typeorm';

import { AdminDTO, AdminListDTO, CreateAdminDTO, UpdateAdminDTO } from './dtos';
import {
  AlreadyExistAdminException,
  CannotUpdateOrRemoveAdminException,
  NotFoundAdminException,
  PasswordMismatchException,
} from './exceptions';

import { AdminRootConfigFactory, toUndefined } from '@/common';
import { AdminEntity } from '@/libs';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly adminRootConfigFactory: AdminRootConfigFactory,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(AdminEntity) : this.adminRepository;
  }

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

  async getList() {
    return new AdminListDTO(await this.adminRepository.findAndCount());
  }

  async getById(id: number) {
    const admin = await this.findById(id);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    return new AdminDTO(admin);
  }

  async create(body: CreateAdminDTO) {
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

  async updateById(id: number, body: UpdateAdminDTO) {
    const admin = await this.findById(id);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    if (admin.isRoot) {
      throw new CannotUpdateOrRemoveAdminException();
    }

    if (body.password !== body.confirmPassword) {
      throw new PasswordMismatchException();
    }

    await this.adminRepository.update(id, {
      name: toUndefined(body.name),
      password: body.password ? await hash(body.password) : undefined,
    });
  }

  async deleteById(id: number) {
    const admin = await this.findById(id);

    if (admin === null) {
      throw new NotFoundAdminException();
    }

    if (admin.isRoot) {
      throw new CannotUpdateOrRemoveAdminException();
    }

    await this.adminRepository.softDelete(id);
  }
}

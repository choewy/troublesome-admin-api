import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IRepositoryImpl } from '../abstracts';

import { Member, MemberRepository } from '@/domain';

@Injectable()
export class MemberRepositoryImpl extends IRepositoryImpl<Member> implements MemberRepository {
  constructor(entityManager: EntityManager) {
    super(Member, entityManager);
  }
}

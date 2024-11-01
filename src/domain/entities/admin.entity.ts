import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

import { BigIntValueTransformer } from '../transformers';
import { BigIntId } from '../vo';

@Entity({ name: 'admin', comment: '관리자' })
export class Admin {
  @Column({
    primary: true,
    type: 'bigint',
    unsigned: true,
    generated: 'increment',
    transformer: new BigIntValueTransformer(),
    comment: '관리자 PK',
  })
  readonly id: BigIntId;

  @Column({ type: 'varchar', length: 340, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'boolean', default: false, comment: '최상위관리자 여부' })
  isRoot: boolean;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

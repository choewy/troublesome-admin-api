import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Partner } from '../partner/partner.entity';

@Entity({ name: 'purchaser', comment: '매입처' })
export class Purchaser {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '매입처 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  partnerId: string | null;

  @ManyToOne(() => Partner, (e) => e.purchasers, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  partner: Partner | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

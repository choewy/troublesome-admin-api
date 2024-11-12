import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Partner } from './partner.entity';

@Entity({ name: 'partner_group', comment: '고객사 그룹' })
export class PartnerGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 그룹 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @OneToMany(() => Partner, (e) => e.partnerGroup, { cascade: true })
  @JoinTable()
  partners: Partner[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

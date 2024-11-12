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

import { PartnerGroup } from './partner-group.entity';

@Entity({ name: 'partner', comment: '고객사' })
export class Partner {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'bigint', unsigned: true })
  partnerGroupId: string;

  @ManyToOne(() => PartnerGroup, (e) => e.partners, { onDelete: 'CASCADE' })
  @JoinColumn()
  partnerGroup: PartnerGroup;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

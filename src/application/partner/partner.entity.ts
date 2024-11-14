import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PartnerGroup } from './partner-group.entity';
import { Purchaser } from '../purchaser/purchaser.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'partner', comment: '고객사' })
export class Partner {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  partnerGroupId: string | null;

  @ManyToOne(() => PartnerGroup, (e) => e.partners, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  partnerGroup: PartnerGroup | null;

  @OneToMany(() => User, (e) => e.partner, { cascade: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Purchaser, (e) => e.partner, { cascade: true })
  @JoinTable()
  purchasers: Purchaser[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

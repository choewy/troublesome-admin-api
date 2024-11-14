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

import { FulfillmentGroup } from './fulfillment-group.entity';
import { Sender } from '../sender/sender.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'fulfillment', comment: '풀필먼트' })
export class Fulfillment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  fulfillmentGroupId: string | null;

  @ManyToOne(() => FulfillmentGroup, (e) => e.fulfillments, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  fulfillmentGroup: FulfillmentGroup | null;

  @OneToMany(() => User, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  users: User[];

  @OneToMany(() => Sender, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  senders: Sender[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

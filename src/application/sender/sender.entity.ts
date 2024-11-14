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

import { Fulfillment } from '../fulfillment/fulfillment.entity';

@Entity({ name: 'sender', comment: '발송인' })
export class Sender {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '발송인 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  fulfillmentId: string | null;

  @ManyToOne(() => Fulfillment, (e) => e.senders, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  fulfillment: Fulfillment | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

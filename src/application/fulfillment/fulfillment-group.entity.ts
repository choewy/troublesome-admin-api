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

import { Fulfillment } from './fulfillment.entity';

@Entity({ name: 'fulfillment_group', comment: '풀필먼트 그룹' })
export class FulfillmentGroup {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '풀필먼트 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @OneToMany(() => Fulfillment, (e) => e.fulfillmentGroup, { cascade: true })
  @JoinTable()
  fulfillments: Fulfillment[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

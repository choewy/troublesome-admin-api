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

import { ItemType, ItemUnit } from './enums';
import { ItemBundle } from './item-bundle.entity';
import { Partner } from '../partner/partner.entity';
import { Purchaser } from '../purchaser/purchaser.entity';

@Entity({ name: 'item', comment: '품목' })
export class Item {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '품목 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 10, comment: '종류' })
  type: ItemType;

  @Column({ type: 'varchar', length: 300, comment: '품목명' })
  name: string;

  @Column({ type: 'varchar', length: 10, comment: '단위' })
  unit: ItemUnit;

  @Column({ type: 'smallint', unsigned: true, comment: '단위 입수량' })
  quantity: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '매입단가' })
  purchasePrice: number;

  @Column({ type: 'int', unsigned: true, default: 0, comment: '판매단가' })
  salesPrice: number;

  @Column({ type: 'bigint', unsigned: true })
  partnerId: string;

  @ManyToOne(() => Partner, { onDelete: 'CASCADE' })
  @JoinColumn()
  partner: Partner;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  purchaserId: string | null;

  @ManyToOne(() => Purchaser, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  purchaser: Purchaser | null;

  @OneToMany(() => ItemBundle, (e) => e.comboItem, { cascade: true })
  @JoinTable()
  comboItemBundle: ItemBundle[];

  @OneToMany(() => ItemBundle, (e) => e.singleItem, { cascade: true })
  @JoinTable()
  singleItemBundle: ItemBundle[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

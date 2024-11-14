import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Item } from './item.entity';

@Entity({ name: 'item_bundle', comment: '품목 세트 정보' })
export class ItemBundle {
  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '품목(세트) PK' })
  comboItemId: string;

  @ManyToOne(() => Item, (e) => e.comboItemBundle, { onDelete: 'CASCADE' })
  @JoinColumn()
  comboItem: Item;

  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '품목(구성품) PK' })
  singleItemId: string;

  @ManyToOne(() => Item, (e) => e.singleItemBundle, { onDelete: 'CASCADE' })
  @JoinColumn()
  singleItem: Item;

  @Column({ type: 'smallint', unsigned: true, comment: '품목(구성품) 수량 - HISTORY' })
  singleItemCount: number;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;
}

import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { ItemUnit } from './enums';
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

  @Column({ type: 'varchar', length: 10, comment: '품목(구성품) 단위 - HISTORY' })
  singleItemUnit: ItemUnit;

  @Column({ type: 'smallint', unsigned: true, comment: '품목(구성품) 수량 - HISTORY' })
  singleItemQuantity: number;

  @Column({ type: 'int', unsigned: true, comment: '품목(구성품) 단가 - HISTORY' })
  singleItemPrice: number;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

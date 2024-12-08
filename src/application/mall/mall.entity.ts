import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'mall', comment: '고객사 몰' })
export class Mall {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '고객사 몰 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 300, comment: '이름' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

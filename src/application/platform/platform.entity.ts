import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'platform', comment: '플랫폼' })
export class Platform {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 100, comment: '이름' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

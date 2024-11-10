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

import { RolePermission } from './role-permission.entity';

@Entity({ name: 'role', comment: '역할' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '역할 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '이름' })
  name: string;

  @OneToMany(() => RolePermission, (e) => e.role, { cascade: true })
  @JoinTable()
  permissions: RolePermission[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}

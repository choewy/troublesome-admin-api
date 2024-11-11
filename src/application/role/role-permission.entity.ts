import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermissionKey } from './enums';
import { Role } from './role.entity';

@Entity({ name: 'role_permission', comment: '역할 권한' })
export class RolePermission {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: '역할 권한 PK' })
  readonly id: string;

  @Column({ type: 'varchar', length: 50, comment: '역할 권한 키' })
  key: RolePermissionKey;

  @Column({ type: 'bigint', unsigned: true })
  roleId: string;

  @ManyToOne(() => Role, (e) => e.permissions, { onDelete: 'CASCADE' })
  role: Role;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;
}

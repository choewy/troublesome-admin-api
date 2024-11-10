import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Role } from './role.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'role_users', comment: '역할 사용자' })
export class RoleUsers {
  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '역할 PK' })
  roleId: string;

  @ManyToOne(() => Role, (e) => e.userJoin, { onDelete: 'CASCADE' })
  @JoinColumn()
  role: Role;

  @PrimaryColumn({ type: 'bigint', unsigned: true, comment: '사용자 PK' })
  userId: string;

  @ManyToOne(() => User, (e) => e.roleJoin, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;
}

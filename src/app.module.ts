import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './application/auth/auth.module';
import { FulfillmentModule } from './application/fulfillment/fulfillment.module';
import { HealthModule } from './application/health';
import { PartnerModule } from './application/partner/partner.module';
import { RolePermissionKey } from './application/role/enums';
import { RolePermission } from './application/role/role-permission.entity';
import { RoleUsers } from './application/role/role-users.entity';
import { Role } from './application/role/role.entity';
import { RoleModule } from './application/role/role.module';
import { UserType } from './application/user/enums';
import { User } from './application/user/user.entity';
import { UserModule } from './application/user/user.module';
import { ContextModule } from './common/context/context.module';
import { DatabaseModule } from './common/database/database.module';
import { PasswordModule } from './common/password/password.module';
import { PasswordService } from './common/password/password.service';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule,
    DatabaseModule,
    RedisModule,
    HealthModule,
    PasswordModule,
    AuthModule,
    UserModule,
    RoleModule,
    PartnerModule,
    FulfillmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly dataSource: DataSource,
    private readonly passwordService: PasswordService,
  ) {}

  async onApplicationBootstrap() {
    const user = await this.createUser();
    const role = await this.createRole();
    await this.createRolePermissions(role);
    await this.createRoleUsers(role, user);
  }

  async createUser() {
    const userRepository = this.dataSource.getRepository(User);
    const user = userRepository.create({
      id: '1',
      type: UserType.Admin,
      name: '관리자',
      email: 'admin@troublesome.com',
      password: await this.passwordService.hash('password'),
    });

    const hasUser = (await userRepository.countBy({ id: user.id })) > 0;

    if (hasUser === false) {
      await userRepository.insert(user);
    }

    return user;
  }

  async createRole() {
    const roleRepository = this.dataSource.getRepository(Role);
    const role = roleRepository.create({
      id: '1',
      name: '관리자',
      editable: false,
      deletedAt: null,
    });

    const hasRole = (await roleRepository.countBy({ id: role.id })) > 0;

    if (hasRole === false) {
      await roleRepository.insert(role);
    }

    return role;
  }

  async createRolePermissions(role: Role) {
    const rolePermissionRepository = this.dataSource.getRepository(RolePermission);
    const rolePermissions = Object.values(RolePermissionKey).map((key) => rolePermissionRepository.create({ roleId: role.id, key }));
    const hasRolePermissions = (await rolePermissionRepository.countBy({ roleId: role.id })) === rolePermissions.length;

    if (hasRolePermissions === false) {
      await rolePermissionRepository.delete({ roleId: role.id });
      await rolePermissionRepository.insert(rolePermissions);
    }
  }

  async createRoleUsers(role: Role, user: User) {
    const roleUsersRepository = this.dataSource.getRepository(RoleUsers);
    const roleUser = roleUsersRepository.create({ roleId: role.id, userId: user.id });
    const hasRoleUser = (await roleUsersRepository.countBy({ roleId: roleUser.roleId, userId: roleUser.userId })) > 0;

    if (hasRoleUser === false) {
      await roleUsersRepository.insert(roleUser);
    }
  }
}

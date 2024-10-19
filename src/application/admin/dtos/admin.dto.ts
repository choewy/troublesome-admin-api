import { ApiProperty } from '@nestjs/swagger';

import { AdminEntity } from '@/libs';

export class AdminDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, format: 'email' })
  email: string;

  @ApiProperty({ type: Boolean })
  isRoot: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor(admin: AdminEntity) {
    this.id = admin.id;
    this.email = admin.email;
    this.name = admin.name;
    this.isRoot = admin.isRoot;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}

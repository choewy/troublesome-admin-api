import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '@/libs';

export class UserDTO {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, format: 'email' })
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}

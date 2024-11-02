import { Controller } from '@nestjs/common';

import { UserService } from '@/application/services';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}
}

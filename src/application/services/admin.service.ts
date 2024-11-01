import { Inject, Injectable } from '@nestjs/common';

import { AdminRepository } from '@/domain';

@Injectable()
export class AdminService {
  constructor(
    @Inject('AdminRepository')
    private readonly adminRepository: AdminRepository,
  ) {}
}

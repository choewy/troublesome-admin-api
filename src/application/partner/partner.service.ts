import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PartnerGroup } from './partner-company.entity';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerService {
  private readonly partnerGroupRepository: Repository<PartnerGroup>;
  private readonly partnerRepository: Repository<Partner>;

  constructor(private readonly dataSource: DataSource) {
    this.partnerGroupRepository = this.dataSource.getRepository(PartnerGroup);
    this.partnerRepository = this.dataSource.getRepository(Partner);
  }

  async getPartnerGroupList() {}

  async getPartnerList() {}
}

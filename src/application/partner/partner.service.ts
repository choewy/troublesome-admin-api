import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PartnerGroupExistByNameResultDTO } from './dto/partner-group-exist-by-name-result.dto';
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

  async checkExistPartnerGroupByName(name: string) {
    return new PartnerGroupExistByNameResultDTO(name, (await this.partnerGroupRepository.countBy({ name })) > 0);
  }

  async getPartnerList() {}
}

import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { GetPartnerGroupListParamDTO } from './dto/get-partner-group-list-param.dto';
import { GetPartnerListParamDTO } from './dto/get-partner-list-param.dto';
import { PartnerGroupExistByNameResultDTO } from './dto/partner-group-exist-by-name-result.dto';
import { PartnerGroupListDTO } from './dto/partner-group-list.dto';
import { PartnerListDTO } from './dto/partner-list.dto';
import { PartnerGroupSearchKeywordField, PartnerSearchKeywordField } from './enums';
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

  private get partnerGroupQueryBuilder() {
    return this.partnerGroupRepository
      .createQueryBuilder('partnerGroup')
      .leftJoinAndMapMany('partnerGroup.partners', 'partnerGroup.partners', 'partners')
      .where('1 = 1');
  }

  private createPartnerGroupSearchKeywordBracket(field: PartnerGroupSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case PartnerGroupSearchKeywordField.Name:
          qb.orWhere('partnerGroup.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('partnerGroup.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  private get partnerQueryBuilder() {
    return this.partnerRepository
      .createQueryBuilder('partner')
      .leftJoinAndMapMany('partner.partnerGroup', 'partner.partnerGroup', 'partnerGroup')
      .where('1 = 1');
  }

  private createPartnerSearchKeywordBracket(field: PartnerSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case PartnerSearchKeywordField.Name:
          qb.orWhere('partner.name LIKE "%:keyword%"', { keyword });

          break;

        case PartnerSearchKeywordField.GroupName:
          qb.orWhere('partnerGroup.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('partner.name LIKE "%:keyword%"', { keyword });
          qb.orWhere('partnerGroup.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getPartnerGroupList(params: GetPartnerGroupListParamDTO) {
    const builder = this.partnerGroupQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createPartnerGroupSearchKeywordBracket(params.field, params.keyword));
    }

    const [partnerGroups, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new PartnerGroupListDTO(partnerGroups, total, params);
  }

  async checkExistPartnerGroupByName(name: string) {
    return new PartnerGroupExistByNameResultDTO(name, (await this.partnerGroupRepository.countBy({ name })) > 0);
  }

  async getPartnerList(params: GetPartnerListParamDTO) {
    const builder = this.partnerQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createPartnerSearchKeywordBracket(params.field, params.keyword));
    }

    const [partners, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new PartnerListDTO(partners, total, params);
  }
}

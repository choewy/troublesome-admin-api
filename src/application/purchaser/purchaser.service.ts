import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { GetPurchaserListParamDTO } from './dto/get-purchaser-list-param.dto';
import { PurchaserListDTO } from './dto/purchase-list.dto';
import { PurchaserSearchKeywordField } from './enums';
import { Purchaser } from './purchaser.entity';

@Injectable()
export class PurchaserService {
  private readonly purchaserRepository: Repository<Purchaser>;

  constructor(private readonly dataSource: DataSource) {
    this.purchaserRepository = this.dataSource.getRepository(Purchaser);
  }

  private get purchaserQueryBuilder() {
    return this.purchaserRepository
      .createQueryBuilder('purchaser')
      .leftJoinAndMapOne('purchaser.partner', 'purchaser.partner', 'partner')
      .where('1 = 1');
  }

  private createPurchaserSearchKeywordBracket(field: PurchaserSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case PurchaserSearchKeywordField.Name:
          qb.orWhere('purchaser.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('purchaser.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getPurchaserList(params: GetPurchaserListParamDTO) {
    const builder = this.purchaserQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createPurchaserSearchKeywordBracket(params.field, params.keyword));
    }

    const [purchasers, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new PurchaserListDTO(purchasers, total);
  }
}

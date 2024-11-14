import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, In, Repository } from 'typeorm';

import { GetPurchaserListParamDTO } from './dto/get-purchaser-list-param.dto';
import { PurchaserListDTO } from './dto/purchaser-list.dto';
import { PurchaserDTO } from './dto/purchaser.dto';
import { PurchaserSearchKeywordField } from './enums';
import { Purchaser } from './purchaser.entity';
import { PartnerService } from '../partner/partner.service';
import { CreatePurchaserDTO } from './dto/create-purchaser.dto';
import { UpdatePurchaserDTO } from './dto/update-purchaser.dto';

@Injectable()
export class PurchaserService {
  private readonly purchaserRepository: Repository<Purchaser>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly partnerService: PartnerService,
  ) {
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

    return new PurchaserListDTO(purchasers, total, params);
  }

  async getPurchaserDetail(id: string) {
    const purchaser = await this.purchaserQueryBuilder.andWhere('purchaser.id = :id', { id }).getOne();

    if (purchaser === null) {
      throw new BadRequestException('not found purchaser');
    }

    return new PurchaserDTO(purchaser);
  }

  async createPurchaser(body: CreatePurchaserDTO) {
    if ((await this.partnerService.hasPartnerById(body.partnerId)) === false) {
      throw new BadRequestException('not found partner');
    }

    await this.purchaserRepository.save({
      partnerId: body.partnerId,
      name: body.name,
    });
  }

  async updatePurchaser(body: UpdatePurchaserDTO) {
    const purchaser = await this.purchaserRepository.findOneBy({ id: body.id });

    if (purchaser === null || !body.name || purchaser.name === body.name) {
      return;
    }

    await this.purchaserRepository.update(body.id, { name: body.name });
  }

  async deletePurchasers(ids: string[]) {
    const purchasers = await this.purchaserRepository.find({
      select: { id: true },
      where: { id: In(['0'].concat(ids)) },
    });

    const purchaserIds = purchasers.map(({ id }) => id);

    if (purchaserIds.length === 0) {
      return;
    }

    await this.purchaserRepository.update({ id: In(purchaserIds) }, { partner: null });
    await this.purchaserRepository.softDelete({ id: In(purchaserIds) });
  }
}

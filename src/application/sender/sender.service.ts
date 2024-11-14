import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, In, Repository } from 'typeorm';

import { CreateSenderDTO } from './dto/create-sender.dto';
import { GetSenderListParamDTO } from './dto/get-sender-list-param.dto';
import { SenderListDTO } from './dto/sender-list.dto';
import { SenderDTO } from './dto/sender.dto';
import { SenderSearchKeywordField } from './enums';
import { Sender } from './sender.entity';
import { FulfillmentService } from '../fulfillment/fulfillment.service';
import { UpdateSenderDTO } from './dto/update-sender.dto';

@Injectable()
export class SenderService {
  private readonly senderRepository: Repository<Sender>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly fulfillmentService: FulfillmentService,
  ) {
    this.senderRepository = this.dataSource.getRepository(Sender);
  }

  private get senderQueryBuilder() {
    return this.senderRepository
      .createQueryBuilder('sender')
      .leftJoinAndMapOne('sender.fulfillment', 'sender.fulfillment', 'fulfillment')
      .where('1 = 1');
  }

  private createSenderSearchKeywordBracket(field: SenderSearchKeywordField, keyword: string) {
    return new Brackets((qb) => {
      qb.where('1 = 1');

      switch (field) {
        case SenderSearchKeywordField.Name:
          qb.orWhere('sender.name LIKE "%:keyword%"', { keyword });

          break;

        default:
          qb.orWhere('sender.name LIKE "%:keyword%"', { keyword });

          break;
      }

      return qb;
    });
  }

  async getSenderList(params: GetSenderListParamDTO) {
    const builder = this.senderQueryBuilder;

    if (params.keyword) {
      builder.andWhere(this.createSenderSearchKeywordBracket(params.field, params.keyword));
    }

    const [senders, total] = await builder.skip(params.skip).take(params.take).getManyAndCount();

    return new SenderListDTO(senders, total);
  }

  async getSenderDetail(id: string) {
    const sender = await this.senderQueryBuilder.andWhere('sender.id = :id', { id }).getOne();

    if (sender === null) {
      throw new BadRequestException('not found sender');
    }

    return new SenderDTO(sender);
  }

  async createSender(body: CreateSenderDTO) {
    if ((await this.fulfillmentService.hasFulfillmentById(body.fulfillmentId)) === false) {
      throw new BadRequestException('not found fulfillment');
    }

    await this.senderRepository.save({
      fulfillmentId: body.fulfillmentId,
      name: body.name,
    });
  }

  async updateSender(body: UpdateSenderDTO) {
    const sender = await this.senderRepository.findOneBy({ id: body.id });

    if (sender === null || !body.name || sender.name === body.name) {
      return;
    }

    await this.senderRepository.update(body.id, { name: body.name });
  }

  async deleteSenders(ids: string[]) {
    const senders = await this.senderRepository.find({
      select: { id: true },
      where: { id: In(['0'].concat(ids)) },
    });

    const senderIds = senders.map(({ id }) => id);

    if (senderIds.length === 0) {
      return;
    }

    await this.senderRepository.update({ id: In(senderIds) }, { fulfillment: null });
    await this.senderRepository.softDelete({ id: In(senderIds) });
  }
}

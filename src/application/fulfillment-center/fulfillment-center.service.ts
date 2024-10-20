import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Like, Repository } from 'typeorm';

import {
  CreateFulfillmentCenterDTO,
  FulfillmentCenterDTO,
  FulfillmentCenterListDTO,
  FulfillmentCenterListQueryDTO,
  UpdateFulfillmentCenterDTO,
} from './dtos';
import { AlreadyExistPlantCodeException, NotFoundFulfillmentCenterException } from './exceptions';
import { DeliveryCompanyService, NotFoundDeliveryCompanyException } from '../delivery-company';
import { DeliveryCompanySettingService } from '../delivery-company-setting';
import { FulfillmentCompanyService, NotFoundFulfillmentCompanyException } from '../fulfillment-company';

import { toNull, toUndefined, toUndefinedOrNull } from '@/common';
import { FulfillmentCenterEntity } from '@/libs';

@Injectable()
export class FulfillmentCenterService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(FulfillmentCenterEntity)
    private readonly fulfillmentCenterRepository: Repository<FulfillmentCenterEntity>,
    private readonly fulfillmentCompanyService: FulfillmentCompanyService,
    private readonly deliveryCompanyService: DeliveryCompanyService,
    private readonly deliveryCompanySettingService: DeliveryCompanySettingService,
  ) {}

  getRepository(em?: EntityManager) {
    return em ? em.getRepository(FulfillmentCenterEntity) : this.fulfillmentCenterRepository;
  }

  async getList(query: FulfillmentCenterListQueryDTO) {
    return new FulfillmentCenterListDTO(
      await this.fulfillmentCenterRepository.findAndCount({
        relations: {
          fulfillmentCompany: true,
          deliveryCompanySettings: { deliveryCompany: true },
        },
        where: {
          name: query.name ? Like(`%${query.name.trim()}%`) : undefined,
          plantCode: query.plantCode ? Like(`%${query.plantCode.trim()}%`) : undefined,
          fulfillmentCompany: query.fulfullmentCompanyName
            ? { name: query.fulfullmentCompanyName ? Like(`%${query.fulfullmentCompanyName.trim()}%`) : undefined }
            : undefined,
          deliveryCompanySettings: { isDefault: true },
        },
        skip: query.skip,
        take: query.take,
      }),
    );
  }

  async getById(id: number) {
    const fulfillmentCenter = await this.findById(id);

    if (fulfillmentCenter === null) {
      throw new NotFoundFulfillmentCenterException();
    }

    return new FulfillmentCenterDTO(fulfillmentCenter);
  }

  async create(body: CreateFulfillmentCenterDTO) {
    if (await this.hasByPlantCode(body.plantCode)) {
      throw new AlreadyExistPlantCodeException();
    }

    if ((await this.fulfillmentCompanyService.hasById(body.fulfillmentCompanyId)) === false) {
      throw new NotFoundFulfillmentCompanyException();
    }

    if ((await this.deliveryCompanyService.hasById(body.deliveryCompanyId)) === false) {
      throw new NotFoundDeliveryCompanyException();
    }

    const transactional = async (em: EntityManager) => {
      const fulfillmentCenterRepository = this.getRepository(em);
      const fulfillmentCenter = fulfillmentCenterRepository.create({
        name: body.name,
        plantCode: body.plantCode,
        consignerName: body.consignerName,
        consignerTel: body.consignerTel,
        consignerPhone: body.consignerPhone,
        zipCode: body.zipCode,
        address: body.address,
        addressDetail: body.addressDetail,
        fulfillmentCompanyId: body.fulfillmentCompanyId,
      });

      await fulfillmentCenterRepository.insert(fulfillmentCenter);

      const deliveryCompanySettingRepository = this.deliveryCompanySettingService.getRepository(em);
      const deliveryCompanySetting = deliveryCompanySettingRepository.create({
        fulfillmentCenterId: fulfillmentCenter.id,
        deliveryCompanyId: body.deliveryCompanyId,
        isDefault: true,
      });

      await deliveryCompanySettingRepository.insert(deliveryCompanySetting);
    };

    await this.dataSource.transaction(transactional);
  }

  async updateById(id: number, body: UpdateFulfillmentCenterDTO) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundFulfillmentCenterException();
    }

    if (body.plantCode && (await this.hasByPlantCode(body.plantCode))) {
      throw new AlreadyExistPlantCodeException();
    }

    if (body.fulfillmentCompanyId && (await this.fulfillmentCompanyService.hasById(body.fulfillmentCompanyId)) === false) {
      throw new NotFoundFulfillmentCompanyException();
    }

    if (body.deliveryCompanyId && (await this.deliveryCompanyService.hasById(body.deliveryCompanyId)) === false) {
      throw new NotFoundDeliveryCompanyException();
    }

    const transactional = async (em: EntityManager) => {
      const fulfillmentCenterRepository = this.getRepository(em);
      await fulfillmentCenterRepository.update(id, {
        name: toUndefined(toNull(body.name)),
        plantCode: toUndefined(toNull(body.plantCode)),
        consignerName: toUndefinedOrNull(body.consignerName),
        consignerTel: toUndefinedOrNull(body.consignerTel),
        consignerPhone: toUndefinedOrNull(body.consignerPhone),
        zipCode: toUndefinedOrNull(body.zipCode),
        address: toUndefinedOrNull(body.address),
        addressDetail: toUndefinedOrNull(body.addressDetail),
        fulfillmentCompanyId: toUndefinedOrNull(body.fulfillmentCompanyId),
      });

      if (toUndefinedOrNull(body.deliveryCompanyId)) {
        const deliveryCompanySettingRepository = this.deliveryCompanySettingService.getRepository(em);
        await deliveryCompanySettingRepository.update(id, { isDefault: false });
        await deliveryCompanySettingRepository.upsert(
          { fulfillmentCenterId: id, deliveryCompanyId: body.deliveryCompanyId, isDefault: true },
          { conflictPaths: { fulfillmentCenterId: true, deliveryCompanyId: true } },
        );
      }
    };

    await this.dataSource.transaction(transactional);
  }

  async deleteById(id: number) {
    if ((await this.hasById(id)) === false) {
      throw new NotFoundFulfillmentCenterException();
    }

    await this.fulfillmentCenterRepository.softDelete(id);
  }

  async hasById(id: number) {
    return !!(await this.fulfillmentCenterRepository.findOne({
      select: { id: true },
      where: { id },
    }));
  }

  async hasByPlantCode(plantCode: string) {
    return !!(await this.fulfillmentCenterRepository.findOne({
      select: { id: true },
      where: { plantCode },
    }));
  }

  async findById(id: number) {
    return this.fulfillmentCenterRepository.findOne({
      relations: {
        fulfillmentCompany: true,
        deliveryCompanySettings: { deliveryCompany: true },
      },
      where: { id },
    });
  }
}

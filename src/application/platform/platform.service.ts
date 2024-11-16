import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { CreatePlatformDTO } from './dto/create-platform.dto';
import { GetPlatformListParamDTO } from './dto/get-platform-list-param.dto';
import { PlatformListDTO } from './dto/platform-list.dto';
import { UpdatePlatformDTO } from './dto/update-platform.dto';
import { Platform } from './platform.entity';

@Injectable()
export class PlatformService {
  private readonly platformRepository: Repository<Platform>;

  constructor(private readonly dataSource: DataSource) {
    this.platformRepository = this.dataSource.getRepository(Platform);
  }

  async getPlatformList(param: GetPlatformListParamDTO) {
    const [platforms, total] = await this.platformRepository.findAndCount({ skip: param.skip, take: param.take });

    return new PlatformListDTO(platforms, total, param);
  }

  async createPlatform(body: CreatePlatformDTO) {
    await this.platformRepository.insert({ name: body.name });
  }

  async updatePlatform(body: UpdatePlatformDTO) {
    const platform = await this.platformRepository.findOneBy({ id: body.id });

    if (platform === null || !body.name || platform.name === body.name) {
      return;
    }

    await this.platformRepository.update(platform, { name: body.name });
  }

  async deletePlatforms(ids: string[]) {
    const platforms = await this.platformRepository.find({
      select: { id: true },
      where: { id: In(['0'].concat(ids)) },
    });

    const platformIds = platforms.map(({ id }) => id);

    if (platformIds.length === 0) {
      return;
    }

    await this.platformRepository.softDelete({ id: In(platformIds) });
  }
}

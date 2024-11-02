import { Provider } from '@nestjs/common';

import * as defaultStorages from '../storage';
import { RedisService } from './redis.service';

export const redisDefaultStorageProviders: Provider[] = Object.values(defaultStorages).map((Storage) => ({
  inject: [RedisService],
  provide: Storage.name.replace('Impl', ''),
  useFactory(redisService: RedisService) {
    return new Storage(redisService);
  },
}));

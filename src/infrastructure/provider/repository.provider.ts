import { Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IRepository } from '@/domain';

export const RepositoryProvider = <Repository extends IRepository<any>>(RepositoryImpl: Type<Repository>): Provider => {
  return {
    inject: [DataSource],
    provide: RepositoryImpl.name,
    useFactory(dataSource: DataSource) {
      return new RepositoryImpl(dataSource.createEntityManager());
    },
  };
};

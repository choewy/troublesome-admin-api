import { ValueTransformer } from 'typeorm';

import { BigIntId } from '../vo';

export class BigIntValueTransformer implements ValueTransformer {
  to(value: BigIntId | string | number | bigint) {
    if (value instanceof BigIntId) {
      return value.value;
    }

    switch (typeof value) {
      case 'bigint':
        return value.toString();

      case 'number':
        return value.toString();

      case 'string':
        return value.toString();

      default:
        return null;
    }
  }

  from(value: BigIntId | number | string | bigint) {
    if (value instanceof BigIntId) {
      return value;
    }

    return new BigIntId(value);
  }
}

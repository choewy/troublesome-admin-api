import { Transform } from 'class-transformer';

export const toUndefined = <T = any>(val: T): T | undefined => (val == null ? undefined : val);
export const toNull = <T = any>(val: T): T | null => (!val ? null : val);
export const toUndefinedOrNull = <T = any>(val: T): T | undefined => (val === undefined ? undefined : toNull(val));
export const toBoolean = <T = any>(val: T): boolean | null => (typeof val === 'boolean' ? val : null);
export const toNumber = <T = any>(val: T): number | null => (typeof val === 'number' ? val : null);

export const stringToBoolean = <T = any>(val: T) => {
  switch (val) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return val;
  }
};

export const StringToBoolean = () => Transform(({ obj, key }) => stringToBoolean(obj[key]));

import { DateTime } from 'luxon';

export const isDateTime = <T = any>(val: T) => val === null || val === undefined || val instanceof DateTime || (val as DateTime).isValid;

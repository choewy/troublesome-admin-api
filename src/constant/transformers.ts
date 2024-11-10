import { Transform } from 'class-transformer';

export const toString = <T = any>(val: T) => String(val);
export const ToString = () => Transform(({ value }) => toString(value));

export const toStringArray = <T = any>(val: T) => (Array.isArray(val) ? val.map((v) => String(v)) : []);
export const ToStringArray = () => Transform(({ value }) => toStringArray(value));

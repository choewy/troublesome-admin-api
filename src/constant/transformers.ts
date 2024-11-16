import { Transform } from 'class-transformer';

export const toString = <T = any>(val: T) => String(val);
export const ToString = () => Transform(({ value }) => toString(value));

export const toNull = <T = any>(val: T) => (val == null ? null : val);
export const ToNull = () => Transform(({ value }) => toNull(value));

export const toStringArray = <T = any>(val: T) => (Array.isArray(val) ? val.map((v) => String(v)) : []);
export const ToStringArray = () => Transform(({ value }) => toStringArray(value));

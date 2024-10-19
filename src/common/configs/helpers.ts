import { NodeEnv } from '../enums';

export const getEnv = () => process.env.NODE_ENV ?? NodeEnv.Local;
export const isLocal = () => getEnv() === NodeEnv.Local;
export const isTest = () => getEnv() === NodeEnv.Test;
export const isDevelopment = () => getEnv() === NodeEnv.Development;
export const isProduction = () => getEnv() === NodeEnv.Production;

import { Transform } from 'class-transformer';

import { stringToBoolean } from './helpers';

export const StringToBoolean = () => Transform(({ obj, key }) => stringToBoolean(obj[key]));

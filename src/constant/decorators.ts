import { SetMetadata } from '@nestjs/common';

import { MetadataKey } from './enums';

export const Public = () => SetMetadata(MetadataKey.IsPublic, true);

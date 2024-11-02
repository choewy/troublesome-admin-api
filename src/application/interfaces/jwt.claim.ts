import { JwtPayload } from 'jsonwebtoken';

import { UserType } from '@/domain';

export interface JwtClaim extends JwtPayload {
  id: string;
  type: UserType;
}

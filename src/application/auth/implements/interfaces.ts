import { JwtPayload } from 'jsonwebtoken';

export interface JwtTokenPayload extends JwtPayload {
  id: number;
}

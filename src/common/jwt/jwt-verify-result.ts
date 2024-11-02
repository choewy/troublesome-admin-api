import { JwtPayload } from 'jsonwebtoken';

export class JwtVerifyResult<Payload extends JwtPayload> {
  ok: boolean = false;
  expired: boolean = false;
  payload: Payload = null;
  error: unknown = null;
}

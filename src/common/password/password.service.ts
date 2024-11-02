import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hash(plainTextPassword: string) {
    return argon2.hash(plainTextPassword);
  }

  async compare(encodedPassword: string, plainTextPassword: string) {
    return argon2.verify(encodedPassword, plainTextPassword);
  }
}

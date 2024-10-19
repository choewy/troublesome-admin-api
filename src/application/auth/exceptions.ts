import { UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {
  constructor() {
    super();

    this.name = InvalidEmailOrPasswordException.name;
  }
}

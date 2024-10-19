import { NotFoundException } from '@nestjs/common';

export class NotFoundAdminException extends NotFoundException {
  constructor() {
    super();

    this.name = NotFoundAdminException.name;
  }
}

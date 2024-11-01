import { Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';

import { ValidationException } from '../exceptions';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory(errors) {
        return new ValidationException(errors);
      },
    });
  }
}

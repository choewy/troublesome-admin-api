import { ConflictException, NotFoundException } from '@nestjs/common';

export class NotFoundFulfillmentException extends NotFoundException {}
export class AlreadyExistPlantCodeException extends ConflictException {}

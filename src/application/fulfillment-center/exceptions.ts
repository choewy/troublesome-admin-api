import { ConflictException, NotFoundException } from '@nestjs/common';

export class NotFoundFulfillmentCenterException extends NotFoundException {}
export class AlreadyExistPlantCodeException extends ConflictException {}

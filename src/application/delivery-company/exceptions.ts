import { ConflictException, NotFoundException } from '@nestjs/common';

export class NotFoundDeliveryCompanyException extends NotFoundException {}
export class AlreadyExistDeliveryCompanyAliasException extends ConflictException {}

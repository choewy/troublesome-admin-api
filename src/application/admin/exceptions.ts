import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';

export class NotFoundAdminException extends NotFoundException {}
export class AlreadyExistAdminException extends ConflictException {}
export class PasswordMismatchException extends BadRequestException {}
export class CannotAccessException extends ForbiddenException {}
export class CannotUpdateOrRemoveAdminException extends ConflictException {}

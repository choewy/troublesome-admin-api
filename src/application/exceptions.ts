import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {}
export class NotFoundUserException extends NotFoundException {}

import { UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {}
export class InvalidJwtTokenException extends UnauthorizedException {}
export class InvalidAdminException extends UnauthorizedException {}

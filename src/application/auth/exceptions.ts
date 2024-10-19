import { UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {}
export class InvalidJwtException extends UnauthorizedException {}
export class InvalidAdminException extends UnauthorizedException {}

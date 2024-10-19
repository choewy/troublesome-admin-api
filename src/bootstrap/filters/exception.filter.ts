import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(e: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    let exception = e as HttpException;

    if (e instanceof HttpException === false) {
      exception = new InternalServerErrorException(e);
      exception.name = InternalServerErrorException.name;
      exception.cause = {
        name: e.name,
        message: e.message,
      };
    }

    return response.status(exception.getStatus()).send({
      id: request['id'],
      name: exception.name.replace('Exception', ''),
      statusCode: exception.getStatus(),
      message: exception.message,
      cause: exception.cause,
    });
  }
}

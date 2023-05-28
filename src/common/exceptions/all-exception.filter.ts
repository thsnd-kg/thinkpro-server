import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { SERVER_ERROR_MESSAGE } from '../constants';
import { ResponseObject } from '../dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.handleResponse(response, exception);
  }

  private handleResponse(response: Response, exception: unknown): void {
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionMessage: any =
      exception instanceof HttpException ? exception.getResponse() : SERVER_ERROR_MESSAGE;

    const responseObject: ResponseObject<any> =
      exceptionMessage instanceof Object
        ? ResponseObject.fail(undefined, exceptionMessage.message || null)
        : ResponseObject.fail(undefined, exceptionMessage);

    responseObject.statusCode = status;

    response.status(status).json(responseObject);
  }
}

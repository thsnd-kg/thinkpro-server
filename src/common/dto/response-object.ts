import { HttpStatus } from '@nestjs/common';

export class ResponseObject<T> {
  success: boolean;

  data: T;

  message: string;

  statusCode: number;

  static success<T>(data?: T, status: HttpStatus = HttpStatus.OK): ResponseObject<T> {
    return {
      data,
      statusCode: status,
      success: true,
      message: null,
    };
  }

  static fail<T>(data: T, message: string): ResponseObject<T> {
    return {
      data,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message,
    };
  }
}

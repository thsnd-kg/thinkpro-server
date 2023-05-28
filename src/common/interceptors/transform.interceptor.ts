import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseObject } from '../dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    return next.handle().pipe(map(data => ResponseObject.success(data, statusCode)));
  }
}

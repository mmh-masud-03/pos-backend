import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.serialize(data)));
  }

  private serialize(data: any) {
    return plainToClass(this.dto, data, {
      excludeExtraneousValues: true,
    });
  }
}

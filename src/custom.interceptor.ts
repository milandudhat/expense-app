import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestInterceptor, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {

        console.log("This is the interceptor for request");

        console.log({ context });
        
        
        return next.handle().pipe(
            map((data) => {
                // You can modify the response data here if needed
                console.log("This is the interceptor for response");
                console.log({ data });
                const response = {
                    ...data,
                    createAt : data.created_at,
                }

                delete response.created_at;
                delete response.updated_at;

                return response;
            }),
        );
    }
}

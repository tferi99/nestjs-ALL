import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DecisionInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const args = ctx.getArgs();
    const handler = ctx.getHandler();
    const arg0 = ctx.getArgByIndex(0);
    const arg1 = ctx.getArgByIndex(1);
    const arg2 = ctx.getArgByIndex(2);
    const arg3 = ctx.getArgByIndex(3);
    const httpCtx = ctx.switchToHttp();
    const rpcCtx = ctx.switchToRpc();
    const a = rpcCtx.getData();
    console.log('DecisionInterceptor');
    return next.handle();
  }
}

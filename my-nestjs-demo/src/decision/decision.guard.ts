import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Reflector } from '@nestjs/core';
import { DECISION_DATA_KEY, DECISION_ARGS_PARAMS_KEY } from './decision-expr.decorator';
import { DecisionProcessorSevice } from './decision-processor.service';
import { ParamIndexes, PARAMS_IDS_KEY } from '../deco/decorators/param-to-metadata.decorator';
import { Decision } from './decision-types';

@Injectable()
export class DecisionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private decisionProcessorSevice: DecisionProcessorSevice, //    private authService: AuthService
  ) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DecisionGuard.canActivate()');
    const handler = ctx.getHandler();

    const decisionData: Decision = this.reflector.get<Decision>(DECISION_DATA_KEY, handler);
    const markedParams: ParamIndexes = this.reflector.get<ParamIndexes>(PARAMS_IDS_KEY, handler);
    const c = ctx.switchToHttp();

    console.log('  DecisionGuard - decisonData:', decisionData);
    console.log('  DecisionGuard - markedParams:', markedParams);
    //    console.log('  DecisionGuard - methodArgs:', methodArgs);

    /*    const roles: string[] = this.reflector.get<string[]>('roles', ctx.getHandler());

    const methodArgs = this.reflector.get<any[]>(DECISION_ARGS_PARAMS_KEY, ctx.getHandler());
    const paramIds = this.reflector.get<ParamIndexes>(PARAMS_IDS_KEY, ctx.getHandler());
    const h: any = ctx.getHandler();


    console.log('  DecisionGuard - roles:', roles);
    console.log('  DecisionGuard - methodArgs:', h);
    console.log('  DecisionGuard - paramIds:', paramIds);*/

    return this.decisionProcessorSevice.process(decisionData, []);
    //return true;
  }
}

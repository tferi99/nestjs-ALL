import { Body, Controller, Get, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClassInfoTrace } from './decorators/class-info-trace';
import { Result } from './types';
import { Required, Validate } from './decorators/validate.decorator';
import { User } from '../auth/user';
import { ParamId } from './decorators/param-to-metadata.decorator';
import { HttpBasicAuthGuard } from '../auth/http-basic-auth-guard';
import { Deco } from './decorators/deco.decorator';
import { Deco2 } from './decorators/deco2.decorator';
import { Deco3 } from './decorators/deco3.decorator';
import { DecisionExpr } from '../decision/decision-expr.decorator';
import { Decisions, Op } from '../decision/decision-types';
import { CurrentUserDecision } from '../decision/current-user-decision';
import { DecisionGuard } from '../decision/decision.guard';
import { EnableGuard } from '../grd/decorators/enable-guard.decorator';
import { GuardId } from '../grd/guards/guard-ids';
import { DecisionInterceptor } from '../decision/decision.interceptor';
import { MetadataDumpGuard } from '../common/guard/MetadataDump.guard';
import { CurrentUser } from '../grd/decorators/current-user.decorator';

@Controller('deco')
@ClassInfoTrace
//@Deco({ label: 'class DecoController' })
export class DecoController {
  text: string;

  @Get('test')
  //@Deco({ label: 'test()' })
  @UseGuards(HttpBasicAuthGuard)
  test(@Req() req): string {
    console.log('test - logged in:', req.user);
    return 'ok';
  }

  @Get('test2')
  //@Deco({ label: 'test2()' })
  //@Deco2({ label: 'test2()' })
  //@Deco3({ label: 'test2()' })
  test2(): string {
    return 'ok';
  }

  /*  @Get('testValid')
  @Validate
  validTest(
    @Query('param1') @Required @Deco({ label: 'param1' }) param1: string,
    @Query('param2') @Required @Deco({ label: 'param2' }) param2: string,
    @Query('param2') @Deco({ label: 'param3' }) param3: string
  ): Result {
    return { message: 'ok' };
  }*/

  /**
   * Only current user OR root can update user.
   *
   * @param cica
   * @param u
   * @param etc
   */
  @Put('user')
  //@UseGuards(HttpBasicAuthGuard)
  @UseGuards(HttpBasicAuthGuard, DecisionGuard)
  @DecisionExpr(new Decisions(Op.AND, [new CurrentUserDecision({ sourceParamId: 'user', func: (user: User) => user.id })]))
  updateUser(@ParamId('cica') cica: string, @ParamId('user') @Body() u: User, @ParamId('etc') etc): any {
    console.log('======================================> start of updateUser()');
    console.log('end of updateUser()');
    return { hello: u.name };
  }

  @Get('testIntercept')
  @UseGuards(MetadataDumpGuard, HttpBasicAuthGuard)
  @EnableGuard({ target: GuardId.G1, enabled: true })
  @UseInterceptors(DecisionInterceptor)
  //  @DecoMethod('TI')
  @DecisionExpr(new Decisions(Op.AND, [new CurrentUserDecision({ sourceParamId: 'user', func: (user: User) => user.id })]))
  testIntercept(@Query('q1') @ParamId('p1') q1: string, @Query('q2') @ParamId('p2') q2: string, @CurrentUser('id') @ParamId('user') userId): string {
    console.log('testIntercept called!!!');
    MetadataDumpGuard.printClassMetadata(DecoController);
    MetadataDumpGuard.printHandlerMetadata(this.testIntercept);

    this.printHello();
    return 'testIntercept OK';
  }

  private printHello() {
    console.log('HELLLOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!');
  }
}

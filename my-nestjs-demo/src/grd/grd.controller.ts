import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Test1Guard } from './guards/test1.guard';
import { Test2Guard } from './guards/test2.guard';
import { EnableGuard } from './decorators/enable-guard.decorator';
import { MetadataDumpGuard } from '../common/guard/MetadataDump.guard';
import { GuardId } from './guards/guard-ids';
import { DecoMethod } from '../deco/decorators/deco-method.decorator';
import { HttpBasicAuthGuard } from '../auth/http-basic-auth-guard';
import { DecisionGuard } from '../decision/decision.guard';

@Controller('grd')
@SetMetadata('ClassMeta1', 'cica')
export class GrdController {
  @Get('testGuardControl')
  /*  @SetMetadata('MethodMeta1', 'kutya')
  @UseGuards(MetadataDumpGuard, Test1Guard, Test2Guard)
  @EnableGuard({ target: GuardId.G1, enabled: true })
  @EnableGuard({ target: GuardId.T1, enabled: true })
  @EnableGuard({ target: GuardId.T2, enabled: true })
  @DecoMethod('testGuardControl()') // !!!!!!!!!!!!!!!! should be used this only on the LAST position - otherwise it hurts metadata assignment !!!!!!!!!!!!!!!!*/
  testGuardControl(): string {
    console.log('==================================================================> test() called');
    return 'ok';
  }
}

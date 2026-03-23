import { Module } from '@nestjs/common';
import { DecoService } from './deco.service';
import { DecoController } from './deco.controller';
import { DecisionModule } from '../decision/decision.module';

/**
 * To demonstrate decorators.
 */
@Module({
  imports: [DecisionModule],
  providers: [DecoService],
  controllers: [DecoController],
})
export class DecoModule {}

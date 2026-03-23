import { Module } from '@nestjs/common';
import { DecisionProcessorSevice } from './decision-processor.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DecisionProcessorSevice],
  exports: [DecisionProcessorSevice],
})
export class DecisionModule {}

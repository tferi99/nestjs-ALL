import { Injectable } from '@nestjs/common';
import { DecisionProcessorSevice } from '../decision/decision-processor.service';

@Injectable()
export class DecoService {
  testDecision(): void {
    //DecisionProcessorSevice.process(undefined);
  }
}

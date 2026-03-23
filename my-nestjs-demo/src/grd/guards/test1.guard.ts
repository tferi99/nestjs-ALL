import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuardId } from './guard-ids';
import { ControllableGuard } from './controllable.guard';

@Injectable()
export class Test1Guard extends ControllableGuard {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }

  getGuardId(): string {
    return GuardId.T1;
  }

  getGuardName(): string {
    return 'Test1Guard';
  }
}

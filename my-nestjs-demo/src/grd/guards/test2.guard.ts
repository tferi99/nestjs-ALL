import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuardId } from './guard-ids';
import { ControllableGuard } from './controllable.guard';

@Injectable()
export class Test2Guard extends ControllableGuard {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }

  getGuardId(): string {
    return GuardId.T2;
  }

  getGuardName(): string {
    return 'Test2Guard';
  }
}

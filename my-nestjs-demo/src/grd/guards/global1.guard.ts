import { Injectable } from '@nestjs/common';
import { ControllableGuard } from './controllable.guard';
import { GuardId } from './guard-ids';
import { Reflector } from '@nestjs/core';

@Injectable()
export class Global1Guard extends ControllableGuard {
  constructor(protected reflector: Reflector) {
    super(reflector);
  }

  getGuardId(): string {
    return GuardId.G1;
  }

  getGuardName(): string {
    return 'Global1Guard';
  }
}

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ENABLE_GUARD_CONFIGS_KEY, GUARD_ENABLED_DEFAULT, GuardConfig } from '../decorators/enable-guard.decorator';

export abstract class ControllableGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  abstract getGuardName(): string;
  abstract getGuardId(): string;

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const name = this.getGuardName();
    const clazz = ctx.getClass();
    const handler = ctx.getHandler();
    console.log(`=== ${name} on ${clazz.name}.${handler.name}() ===`);

    let enabled = GUARD_ENABLED_DEFAULT;
    const existingGuardConfigs = this.reflector.get<Map<string, GuardConfig>>(ENABLE_GUARD_CONFIGS_KEY, handler);
    if (existingGuardConfigs !== undefined) {
      const cfg = existingGuardConfigs.get(this.getGuardId());
      if (cfg !== undefined) {
        enabled = cfg.enabled;
      }
    }
    console.log(`    ${name} ---> enabled: ${enabled}`);
    return enabled;
  }
}

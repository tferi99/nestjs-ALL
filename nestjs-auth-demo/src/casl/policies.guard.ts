import { PolicyHandler } from './handlers';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';
import { Author } from './author';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    console.log('PoliciesGuard() - handlers: ', policyHandlers);

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException();
    }
    const author = Author.fromUser(user);
    const ability = this.caslAbilityFactory.createForAuthor(author);

    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}

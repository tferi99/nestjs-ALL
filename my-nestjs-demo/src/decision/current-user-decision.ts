import { User } from '../auth/user';
import { Decision, DecisionContext } from './decision-types';

export interface CurrentUserProvider {
  getCurrentUser(): User;
}

export class CurrentUserDecision implements Decision {
  userIdRetriever: UserIdRetriever;

  constructor(userIdRetriever: UserIdRetriever) {
    this.userIdRetriever = userIdRetriever;
  }

  evaluate(ctx: DecisionContext): boolean {
    return false;
  }

  validate(): void {}

  toString(): string {
    return 'CurrentUserDecision';
  }
}

export type UserIdRetrieveFunction = (data: any) => number; // User.id is number

export interface UserIdRetriever {
  sourceParamId: string;
  func?: UserIdRetrieveFunction;
}

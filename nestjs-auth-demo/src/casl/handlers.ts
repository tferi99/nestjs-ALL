import { AppAbility } from '../casl/casl-ability.factory';

// interface
interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

// function
type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

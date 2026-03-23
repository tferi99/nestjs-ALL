import { ParamIndexes, PARAMS_IDS_KEY } from '../deco/decorators/param-to-metadata.decorator';
import { Decision } from './decision-types';

export const DECISION_DATA_KEY = 'DecisionData';
export const DECISION_ARGS_PARAMS_KEY = 'DecisionArgsParams';

export const DecisionExpr = (data: Decision): MethodDecorator => {
  /*  console.log('@DecisionExpr - factory data ', data);
  const prefix = '    # DecisionExpr: ';*/

  const factory = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    //    console.log('@DecisionExpr call:', data);
    console.log('FACTORY - @DecisionExpr');
    const markedParams: ParamIndexes = Reflect.getOwnMetadata(PARAMS_IDS_KEY, target, propertyName);
    console.log('    - Marked mathod parameters: ', markedParams);

    Reflect.defineMetadata(DECISION_DATA_KEY, data, descriptor.value);
    Reflect.defineMetadata(PARAMS_IDS_KEY, markedParams, descriptor.value);

    const childFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log('DecisionExpr - child function - args:', args);
      const markedParams: ParamIndexes = Reflect.getMetadata(PARAMS_IDS_KEY, target, propertyName);
      console.log('DecisionExpr child function - Marked mathod parameters: ', markedParams);
      console.log('DecisionExpr child function - decisions: ', data);
      return childFunction.apply(this, args);
    };
  };
  return factory;
};

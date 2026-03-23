import { User } from '../../auth/user';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { DuplicatedException } from '../exception/exceptions';

export const PARAMS_IDS_KEY = 'ParamsIds';

export function ParamId(id: string): any {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    console.log('FACTORY - @ParamId: ', id);
    const existingParameters: ParamIndexes = Reflect.getOwnMetadata(PARAMS_IDS_KEY, target, propertyKey) || new Map<string, number>();
    const existing = existingParameters.get(id);
    if (existing) {
      throw new DuplicatedException('Parameter already identified with this ID: ' + id, HttpStatus.EXPECTATION_FAILED);
    }
    existingParameters.set(id, parameterIndex);
    Reflect.defineMetadata(PARAMS_IDS_KEY, existingParameters, target, propertyKey);
  };
}

export type ParamIndexes = Map<string, number>;

import 'reflect-metadata';
import { MissingRequiredException } from '../exception/exceptions';
import { HttpStatus } from '@nestjs/common';
const requiredMetadataKey = Symbol('required');

export function Required(target: any, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

export function Validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value!;

  if (descriptor.get) {
    const val = descriptor.get();
    console.log('Value is:', val);
  }

  descriptor.value = function (...args) {
    console.log('Method parameters: ', args);
    const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new MissingRequiredException('Missing Parameter - position: ' + parameterIndex, HttpStatus.EXPECTATION_FAILED);
        }
      }
    }
    return method.apply(this, args);
  };
}

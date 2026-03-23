export function ParamInfoTrace(target: any, propertyKey: string | symbol, parameterIndex: number) {
  console.log('@ParamInfoTrace:');
  console.log('    - target:', target);
  console.log('    - propertyKey:', propertyKey);
  console.log('    - parameterIndex:', parameterIndex);
}

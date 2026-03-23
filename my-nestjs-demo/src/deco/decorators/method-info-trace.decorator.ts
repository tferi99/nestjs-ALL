export function MethodInfoTrace() {
  /*
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('- METHOD');
    console.log('    - target:', target);
    console.log('    - propertyKey:', propertyKey);
    console.log('    - descriptor:', descriptor);
  };*/

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('- METHOD');
    console.log('    - target:', target);
    console.log('    - propertyKey:', propertyKey);
    console.log('    - descriptor:', descriptor);

    // no return means don't change target function
  };
}

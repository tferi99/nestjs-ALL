/**
 * For demonstrating decorator initialization and execution.
 * It prints parameter of decorator function.
 *
 * @param args
 * @constructor
 */
import { DecoConfig } from './deco.decorator';

export function Deco2(config: DecoConfig): any {
  const prefix = `@Deco2[${config.label}]`;
  console.log(prefix + ' factory');
  return (...args) => {
    console.log(prefix + `(args: ${args.length}): ...`);
  };
}

/**
 * For demonstrating decorator initialization and execution.
 * It prints parameter of decorator function.
 *
 * @param args
 * @constructor
 */
export function Deco(config: DecoConfig): any {
  const prefix = `@Deco[${config.label}]`;
  console.log(prefix + ' factory');
  return (...args) => {
    console.log(prefix + `(args: ${args.length}):`, args);
  };
}

export interface DecoConfig {
  label: string;
}

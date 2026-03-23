import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamDeco = createParamDecorator((data: any, ctx: ExecutionContext) => {
  console.log('RequestParamDeco: called', data);
  const request = ctx.switchToHttp().getRequest();
  return request.params[data];
});

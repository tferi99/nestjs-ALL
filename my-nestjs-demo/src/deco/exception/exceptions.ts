import { HttpException } from '@nestjs/common';

export class MissingRequiredException extends HttpException {}
export class DuplicatedException extends HttpException {}

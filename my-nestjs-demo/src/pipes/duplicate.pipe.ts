import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class DuplicatePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    return value + '+' + value;
  }
}

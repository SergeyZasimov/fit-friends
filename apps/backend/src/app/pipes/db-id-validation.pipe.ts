import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { PipeErrorMessage } from './pipes.constant';

export class DbIdValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(PipeErrorMessage.OnlyParam);
    }

    if (isNaN(Number(value))) {
      throw new BadRequestException(PipeErrorMessage.DbIdNorValid);
    }

    return value;
  }
}

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const validationTarget = plainToClass(metadata.metatype, value);
    const validationErrors = await validate(validationTarget);

    // if errors array contains elements
    if (validationErrors.length > 0) {
      const messages = validationErrors.map((error) => {
        return (
          error.property + ' - ' + Object.values(error.constraints).join(', ')
        );
      });
      throw new ValidationException(messages);
    }

    return value;
  }
}

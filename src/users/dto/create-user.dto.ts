import { IsString } from 'class-validator';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Должна быть строка' })
  readonly name: string;
  @IsEmail({}, { message: 'Некоректная почта' })
  @IsString({ message: 'Должна быть строка' })
  readonly email: string;
  @IsString({ message: 'Должна быть строка' })
  @Length(4, 16, { message: 'не меньше 4 и не больше 16' })
  readonly password: string;
}

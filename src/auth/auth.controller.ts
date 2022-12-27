import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/sign-up')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

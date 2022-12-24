import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServies: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersServies.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.usersServies.getAllUsers();
  }

  @Delete(':id')
  removeUser(@Param() id: number) {
    return this.usersServies.removeUser(id);
  }

  @Put()
  updateUser(@Body() updateUserDro: UpdateUserDto) {
    return this.usersServies.updateUser(updateUserDro);
  }
}

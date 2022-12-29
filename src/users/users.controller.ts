import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServies: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersServies.createUser(userDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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

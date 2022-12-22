import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
        return this.usersServies.getAllUsers()
    }
}

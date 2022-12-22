import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {

    }
    async createUser(userDto: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.save({...userDto})
    }

    async getOneUser(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({id: id})
    }
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async removeUser(id: number): Promise<number> {
        await this.userRepository.delete({id})
        return id
    }

    async updateUser( userDto: UpdateUserDto ): Promise<UserEntity> {
        await this.userRepository.update({id: userDto.id}, {...userDto}) 
        return this.getOneUser(userDto.id)
    }
}

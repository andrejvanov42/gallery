import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private roleService: RolesService,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.create(userDto);
    await this.userRepository.save(user);
    const role = await this.roleService.getRoleByValue('user');
    await this.roleService.addUserRole(user, role);
    return user;
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: id });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: {
        userRoles: true,
      },
    });
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id;
  }

  async updateUser(userDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update({ id: userDto.id }, { ...userDto });
    return this.getOneUser(userDto.id);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
}

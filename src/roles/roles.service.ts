import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './roles.entity';
import { UserRoleEntity } from './user-roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly usersRolesRepository: Repository<UserRoleEntity>,
  ) {}

  async createRole(roleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleRepository.save({ ...roleDto });
  }

  async getRoleByValue(value: string): Promise<RoleEntity> {
    return this.roleRepository.findOneBy({ value: value });
  }

  async addUserRole(
    user: UserEntity,
    role: RoleEntity,
  ): Promise<UserRoleEntity> {
    const userRole = this.usersRolesRepository.create({
      user: user,
      role: role,
    });
    await this.usersRolesRepository.save(userRole);

    return userRole;
  }
}

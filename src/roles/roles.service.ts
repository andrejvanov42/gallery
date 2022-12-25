import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(roleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleRepository.save({ ...roleDto });
  }

  async getRoleByValue(value: string): Promise<RoleEntity> {
    return this.roleRepository.findOneBy({ value: value });
  }
}

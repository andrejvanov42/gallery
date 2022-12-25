import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoleEntity } from 'src/roles/user-roles.entity';
import { UserEntity } from './user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRoleEntity]),
    RolesModule,
  ],
})
export class UsersModule {}

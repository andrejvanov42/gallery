import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContentEntity } from 'src/content/content.entity';
import { ContentModule } from 'src/content/content.module';
import { FilesModule } from 'src/files/files.module';
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
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      UserRoleEntity,
      ContentEntity,
    ]),
    FilesModule,
    RolesModule,
    ContentModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}

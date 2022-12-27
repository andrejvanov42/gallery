import { UserEntity } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserRoleEntity } from './user-roles.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @OneToMany(() => UserRoleEntity, (userRole: UserRoleEntity) => userRole.role)
  roleUsers: UserRoleEntity[];
}

import { UserEntity } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('user_roles')
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (users: UserEntity) => users.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (roles) => roles.value, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  role: RoleEntity;
}

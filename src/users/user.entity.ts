import { UserRoleEntity } from 'src/roles/user-roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => UserRoleEntity, (userRole: UserRoleEntity) => userRole.user)
  userRoles: UserRoleEntity[];
}

import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('user_roles')
export class UserRoleEntity {
  @PrimaryColumn()
  userId: string;

  @Column()
  roleId: string;

  @ManyToOne(() => UserEntity, (user) => user.roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  roles: RoleEntity;
}

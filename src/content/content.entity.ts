import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  user: UserEntity;
}

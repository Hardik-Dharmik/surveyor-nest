import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false, default: 'abc' })
  username: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    default: 'abc@gmail.com',
  })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false, default: '123456' })
  password: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

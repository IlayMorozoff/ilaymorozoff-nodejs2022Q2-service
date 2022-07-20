import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: number; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: number; // timestamp of last update
}

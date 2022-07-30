import { Exclude, Transform } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

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
  @Transform(({ value }) => value.getTime())
  createdAt: number; // timestamp of creation

  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: number; // timestamp of last update

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(
      this.password,
      +config.get<number>('JWT_SALT_PASSWORD'),
    );
  }

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  accessToken: string;
}

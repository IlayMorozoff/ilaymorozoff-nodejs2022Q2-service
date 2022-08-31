import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [InMemoryDbModule, TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}

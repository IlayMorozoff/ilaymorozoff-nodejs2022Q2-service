import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [InMemoryDbModule],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [InMemoryDbModule],
})
export class AlbumsModule {}

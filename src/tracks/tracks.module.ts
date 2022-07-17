import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [InMemoryDbModule],
})
export class TracksModule {}

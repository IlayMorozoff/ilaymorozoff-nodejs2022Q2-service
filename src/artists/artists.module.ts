import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [InMemoryDbModule],
})
export class ArtistsModule {}

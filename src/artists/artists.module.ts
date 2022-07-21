import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [InMemoryDbModule, TypeOrmModule.forFeature([ArtistEntity])],
})
export class ArtistsModule {}

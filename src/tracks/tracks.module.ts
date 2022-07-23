import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forFeature([TrackEntity]),
  ],
})
export class TracksModule {}

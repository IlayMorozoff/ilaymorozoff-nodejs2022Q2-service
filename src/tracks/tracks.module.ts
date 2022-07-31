import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [TracksController],
  providers: [TracksService, AuthGuard],
  imports: [
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forFeature([TrackEntity, FavoritesEntity]),
  ],
  exports: [TracksService],
})
export class TracksModule {}

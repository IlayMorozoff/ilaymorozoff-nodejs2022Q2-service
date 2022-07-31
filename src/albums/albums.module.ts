import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AuthGuard],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, FavoritesEntity]),
    ArtistsModule,
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}

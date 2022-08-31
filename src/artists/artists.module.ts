import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([ArtistEntity, FavoritesEntity])],
  exports: [ArtistsService],
})
export class ArtistsModule {}

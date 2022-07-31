import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AuthGuard],
  imports: [TypeOrmModule.forFeature([ArtistEntity, FavoritesEntity])],
  exports: [ArtistsService],
})
export class ArtistsModule {}

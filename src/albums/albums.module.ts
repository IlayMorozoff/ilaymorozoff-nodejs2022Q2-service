import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [ArtistsModule, TypeOrmModule.forFeature([AlbumEntity])],
  exports: [AlbumsService],
})
export class AlbumsModule {}

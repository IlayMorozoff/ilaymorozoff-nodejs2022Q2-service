import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from 'src/in-memory-db/favorites.repository';
import { AlbumsRepository } from './albums.repository';
import { ArtistsRepository } from './artists.repository';
import { TracksRepository } from './tracks.repository';
import { UsersRepository } from './users.repository';

@Injectable()
export class InMemoryDbService {
  public user = new UsersRepository();
  public artist = new ArtistsRepository();
  public album = new AlbumsRepository();
  public track = new TracksRepository();
  public favorites = new FavoritesRepository();
}

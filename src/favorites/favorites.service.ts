import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorMessages } from 'src/common/errorsMgs';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly inMemoryDbService: InMemoryDbService) {}

  findAll() {
    return this.inMemoryDbService.favorites.findAll();
  }

  addArtistToFavorites(id: string) {
    const artist = this.inMemoryDbService.artist.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        ErrorMessages.ARTIST_WITH_CURRENT_ID_DOES_NOT_EXIST,
      );
    }
    this.inMemoryDbService.favorites.addArtistToFavorites(artist);
    return artist;
  }

  removeArtistFromFavorites(id: string) {
    const artist = this.inMemoryDbService.artist.findOne(id);

    if (!artist) {
      throw new NotFoundException(ErrorMessages.ARTIST_NOT_FOUND);
    }
    this.inMemoryDbService.favorites.removeArtistFromFavorites(id);
  }

  addAlbumToFavorites(id: string) {
    const album = this.inMemoryDbService.album.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException(
        ErrorMessages.ARTIST_WITH_CURRENT_ID_DOES_NOT_EXIST,
      );
    }
    this.inMemoryDbService.favorites.addAlbumToFavorites(album);
    return album;
  }

  removeAlbumFromFavorites(id: string) {
    const album = this.inMemoryDbService.album.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException(ErrorMessages.ALBUM_NOT_FOUND);
    }
    this.inMemoryDbService.favorites.removeAlbumFromFavorites(id);
  }

  addTrackToFavorites(id: string) {
    const track = this.inMemoryDbService.track.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException(ErrorMessages.TRACK_NOT_FOUND);
    }
    this.inMemoryDbService.favorites.addTrackToFavorites(track);
    return track;
  }

  removeTrackFromFavorites(id: string) {
    const track = this.inMemoryDbService.track.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException(ErrorMessages.TRACK_NOT_FOUND);
    }
    this.inMemoryDbService.favorites.removeTrackFromFavorites(id);
  }
}

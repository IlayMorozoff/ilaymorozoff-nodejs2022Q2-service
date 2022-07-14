import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';

export class FavoritesRepository {
  private favorites: FavoritesEntity = {
    artists: [],
    tracks: [],
    albums: [],
  };

  findAll() {
    return this.favorites;
  }

  addArtistToFavorites(artist: ArtistEntity): ArtistEntity {
    this.favorites.artists.push(artist);
    return artist;
  }

  removeArtistFromFavorites(id: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (item) => item.id !== id,
    );
  }

  addAlbumToFavorites(album: AlbumEntity): AlbumEntity {
    this.favorites.albums.push(album);
    return album;
  }

  removeAlbumFromFavorites(id: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (item) => item.id !== id,
    );
  }

  addTrackToFavorites(track: TrackEntity): TrackEntity {
    this.favorites.tracks.push(track);
    return track;
  }

  removeTrackFromFavorites(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (item) => item.id !== id,
    );
  }
}

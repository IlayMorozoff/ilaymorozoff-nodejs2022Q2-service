import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

export class FavoritesRepository {
  favorites: any = {
    artists: [],
    tracks: [],
    albums: [],
  };

  findAll() {
    return this.favorites;
  }

  addArtistToFavorites(artist: ArtistEntity): ArtistEntity {
    this.favorites.artists.push(artist.id);
    return artist;
  }

  removeArtistFromFavorites(id: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (itemId) => itemId !== id,
    );
  }

  addAlbumToFavorites(album: AlbumEntity): AlbumEntity {
    this.favorites.albums.push(album.id);
    return album;
  }

  removeAlbumFromFavorites(id: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (itemId) => itemId !== id,
    );
  }

  addTrackToFavorites(track: TrackEntity): TrackEntity {
    this.favorites.tracks.push(track.id);
    return track;
  }

  removeTrackFromFavorites(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (itemId) => itemId !== id,
    );
  }
}

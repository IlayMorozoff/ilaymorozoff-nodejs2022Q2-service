import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { ErrorMessages } from 'src/common/errorsMgs';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  async findAll(): Promise<FavoritesEntity> {
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return favorites;
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistsService.checkExistingDependencyArtist(id);
    const favs = await this.findAll();
    this.alreadeExistsError(favs, id);

    favs.artists.push(artist);
    await this.favoritesRepository.save(favs);
    return artist;
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.artistsService.checkExistingArtist(id);
    const favs = await this.findAll();

    if (favs.artists.map((item) => item.id).includes(id)) {
      favs.artists = favs.artists.filter((item) => item.id !== id);
    }
    await this.favoritesRepository.save(favs);
    return artist;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumsService.checkExistingDependencyAlbum(id);
    const favs = await this.findAll();
    favs.albums.push(album);

    await this.favoritesRepository.save(favs);
    return album;
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.albumsService.checkExistingDependencyAlbum(id);
    const favs = await this.findAll();

    if (favs.albums.map((item) => item.id).includes(id)) {
      favs.albums = favs.albums.filter((item) => item.id !== id);
    }

    await this.favoritesRepository.save(favs);
    return album;
  }

  async addTrackToFavorites(id: string) {
    const track = await this.tracksService.checkExistingDependencyTrack(id);
    const favs = await this.findAll();
    favs.tracks.push(track);

    await this.favoritesRepository.save(favs);
    return track;
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.tracksService.checkExistingDependencyTrack(id);
    const favs = await this.findAll();

    if (favs.tracks.map((item) => item.id).includes(id)) {
      favs.tracks = favs.tracks.filter((item) => item.id !== id);
    }

    await this.favoritesRepository.save(favs);
    return track;
  }

  alreadeExistsError(favs: FavoritesEntity, id: string) {
    if (favs.artists.map((item) => item.id).includes(id)) {
      throw new BadRequestException(
        ErrorMessages.EntityWithCurrentIdAlreadyAddedIntoFavorites,
      );
    }
  }
}

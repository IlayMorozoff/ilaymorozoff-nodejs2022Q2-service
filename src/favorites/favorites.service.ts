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

  async buildResponseFavorites(favorites: FavoritesEntity) {
    return {
      artists:
        (await Promise.all(
          favorites?.artists?.map((id) => this.artistsService.findOne(id)),
        )) || [],
      albums:
        (await Promise.all(
          favorites?.albums?.map(
            async (id) => await this.albumsService.findOne(id),
          ),
        )) || [],
      tracks:
        (await Promise.all(
          favorites?.tracks?.map(
            async (id) => await this.tracksService.findOne(id),
          ),
        )) || [],
    };
  }

  async findAll(): Promise<FavoritesEntity> {
    const favorites = await this.favoritesRepository.find();
    return favorites.length && favorites[0]
      ? favorites[0]
      : new FavoritesEntity();
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistsService.checkExistingDependencyArtist(id);
    const favs = await this.findAll();
    this.alreadeExistsError(favs, id);

    favs.artists.push(id);
    await this.favoritesRepository.save(favs);
    return artist;
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.artistsService.checkExistingArtist(id);
    const favs = await this.findAll();

    if (favs.artists.includes(id)) {
      favs.artists = favs.artists.filter((item) => item !== id);
    }
    await this.favoritesRepository.save(favs);
    return artist;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumsService.checkExistingDependencyAlbum(id);
    const favs = await this.findAll();
    favs.albums.push(id);

    await this.favoritesRepository.save(favs);
    return album;
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.albumsService.checkExistingDependencyAlbum(id);
    const favs = await this.findAll();

    if (favs.albums.includes(id)) {
      favs.albums = favs.albums.filter((item) => item !== id);
    }

    await this.favoritesRepository.save(favs);
    return album;
  }

  async addTrackToFavorites(id: string) {
    const track = await this.tracksService.checkExistingDependencyTrack(id);
    const favs = await this.findAll();
    favs.tracks.push(id);

    await this.favoritesRepository.save(favs);
    return track;
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.tracksService.checkExistingDependencyTrack(id);
    const favs = await this.findAll();

    if (favs.tracks.includes(id)) {
      favs.tracks = favs.tracks.filter((item) => item !== id);
    }

    await this.favoritesRepository.save(favs);
    return track;
  }

  alreadeExistsError(favs: FavoritesEntity, id: string) {
    if (favs.artists.includes(id)) {
      throw new BadRequestException(
        ErrorMessages.EntityWithCurrentIdAlreadyAddedIntoFavorites,
      );
    }
  }
}

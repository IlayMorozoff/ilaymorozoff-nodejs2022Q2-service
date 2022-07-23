import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ErrorMessages } from 'src/common/errorsMgs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    await this.artistsService.checkExistingDependencyArtist(
      createTrackDto.artistId,
    );
    await this.albumsService.checkExistingDependencyAlbum(
      createTrackDto.albumId,
    );

    const newTrack = new TrackEntity();
    Object.assign(newTrack, createTrackDto);
    const createdTrack = this.tracksRepository.create(newTrack);
    return this.tracksRepository.save(createdTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    await this.checkExistingTrack(id);
    return this.tracksRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.checkExistingTrack(id);
    Object.assign(track, updateTrackDto);
    const createdTrack = this.tracksRepository.create(track);
    return this.tracksRepository.save(createdTrack);
  }

  async remove(id: string): Promise<void> {
    const track = await this.checkExistingTrack(id);
    await this.tracksRepository.remove(track);

    const favs = await this.favoritesRepository.find();

    if (favs.length && favs[0] && favs[0].tracks.includes(id)) {
      favs[0] = {
        ...favs[0],
        tracks: favs[0].tracks.filter((item) => item !== id),
      };

      await this.favoritesRepository.save(favs);
    }
  }

  private async checkExistingTrack(id: string): Promise<TrackEntity> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(ErrorMessages.TRACK_NOT_FOUND);
    }
    return track;
  }

  async checkExistingDependencyTrack(id: string): Promise<TrackEntity> {
    if (id) {
      const entityInDb = await this.tracksRepository.findOneBy({ id });
      if (!entityInDb) {
        throw new UnprocessableEntityException(
          `Track with id ${id} does not exist`,
        );
      }

      return entityInDb;
    }
  }
}

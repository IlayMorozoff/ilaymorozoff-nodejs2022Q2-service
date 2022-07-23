import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ErrorMessages } from 'src/common/errorsMgs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
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
  }

  private async checkExistingTrack(id: string): Promise<TrackEntity> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(ErrorMessages.TRACK_NOT_FOUND);
    }
    return track;
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ErrorMessages } from 'src/common/errorsMgs';

@Injectable()
export class TracksService {
  constructor(private readonly inMemoryDbService: InMemoryDbService) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    this.checkExistingDependentEntity(createTrackDto.artistId, 'artist');
    this.checkExistingDependentEntity(createTrackDto.albumId, 'album');

    const newTrack = new TrackEntity();

    newTrack.id = uuidv4();
    newTrack.albumId = createTrackDto.albumId || null;
    newTrack.artistId = createTrackDto.artistId || null;
    newTrack.duration = createTrackDto.duration;
    newTrack.name = createTrackDto.name;

    return this.inMemoryDbService.track.create(newTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.inMemoryDbService.track.findAll();
  }

  async findOne(id: string): Promise<TrackEntity> {
    this.checkExistingTrack(id);
    return this.inMemoryDbService.track.findOne(id);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = this.checkExistingTrack(id);

    const newTrack = {
      ...track,
      ...updateTrackDto,
    };

    return this.inMemoryDbService.track.update(id, newTrack);
  }

  async remove(id: string): Promise<void> {
    this.checkExistingTrack(id);
    this.inMemoryDbService.track.remove(id);
    this.inMemoryDbService.favorites.removeTrackFromFavorites(id);
  }

  private checkExistingTrack(id: string): TrackEntity {
    const track = this.inMemoryDbService.track.findOne(id);

    if (!track) {
      throw new NotFoundException(ErrorMessages.TRACK_NOT_FOUND);
    }
    return track;
  }

  private checkExistingDependentEntity(id: string, entity: string): void {
    if (id) {
      const entityInDb = this.inMemoryDbService[`${entity}`].findOne(id);
      if (!entityInDb) {
        throw new UnprocessableEntityException(
          `${entity} with id ${id} does not exist`,
        );
      }
    }
  }
}

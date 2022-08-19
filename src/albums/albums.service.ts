import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ErrorMessages } from 'src/common/errorsMgs';
import { AlbumEntity } from './entities/album.entity';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly inMemoryDbService: InMemoryDbService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    if (createAlbumDto.artistId) {
      const artist = this.inMemoryDbService.artist.findOne(
        createAlbumDto.artistId,
      );
      if (!artist) {
        throw new UnprocessableEntityException(
          `Artist with id ${createAlbumDto.artistId} does not exist`,
        );
      }
    }
    const newAlbum = new AlbumEntity();

    newAlbum.id = uuidv4();
    newAlbum.artistId = createAlbumDto.artistId || null;
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;

    return this.inMemoryDbService.album.create(newAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.inMemoryDbService.album.findAll();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    this.checkExistingAlbum(id);
    return this.inMemoryDbService.album.findOne(id);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = this.checkExistingAlbum(id);

    const newAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    return this.inMemoryDbService.album.update(id, newAlbum);
  }

  async remove(id: string): Promise<void> {
    this.checkExistingAlbum(id);
    this.inMemoryDbService.album.remove(id);

    const tracks = this.inMemoryDbService.track
      .findAll()
      .filter((item) => item.albumId === id);

    if (tracks.length !== 0) {
      tracks.forEach((track) => {
        this.inMemoryDbService.track.update(track.id, {
          ...track,
          albumId: null,
        });
      });
    }
    this.inMemoryDbService.favorites.removeAlbumFromFavorites(id);
  }

  private checkExistingAlbum(id: string): AlbumEntity {
    const album = this.inMemoryDbService.album.findOne(id);

    if (!album) {
      throw new NotFoundException(ErrorMessages.ALBUM_NOT_FOUND);
    }
    return album;
  }
}

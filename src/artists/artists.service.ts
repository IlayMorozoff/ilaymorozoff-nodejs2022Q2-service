import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from 'src/common/errorsMgs';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly inMemoryDbService: InMemoryDbService) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtists = new ArtistEntity();

    newArtists.id = uuidv4();
    newArtists.grammy = createArtistDto.grammy;
    newArtists.name = createArtistDto.name;

    return this.inMemoryDbService.artist.create(newArtists);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return this.inMemoryDbService.artist.findAll();
  }

  async findOne(id: string) {
    this.checkExistingArtist(id);
    return this.inMemoryDbService.artist.findOne(id);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = this.checkExistingArtist(id);

    const newArtist = {
      ...artist,
      ...updateArtistDto,
    };

    return this.inMemoryDbService.artist.update(id, newArtist);
  }

  async remove(id: string): Promise<void> {
    this.checkExistingArtist(id);
    this.inMemoryDbService.artist.remove(id);
    const albums = this.inMemoryDbService.album
      .findAll()
      .filter((item) => item.artistId === id);

    if (albums.length !== 0) {
      albums.forEach((album) => {
        this.inMemoryDbService.album.update(album.id, {
          ...album,
          artistId: null,
        });
      });
    }

    const tracks = this.inMemoryDbService.track
      .findAll()
      .filter((item) => item.artistId === id);

    if (tracks.length !== 0) {
      tracks.forEach((track) => {
        this.inMemoryDbService.track.update(track.id, {
          ...track,
          artistId: null,
        });
      });
    }

    this.inMemoryDbService.favorites.removeArtistFromFavorites(id);
  }

  private checkExistingArtist(id: string) {
    const artist = this.inMemoryDbService.artist.findOne(id);

    if (!artist) {
      throw new NotFoundException(ErrorMessages.ARTIST_NOT_FOUND);
    }

    return artist;
  }
}

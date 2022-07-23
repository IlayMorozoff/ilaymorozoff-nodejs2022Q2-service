import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorMessages } from 'src/common/errorsMgs';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtists = new ArtistEntity();
    Object.assign(newArtists, createArtistDto);
    const createdArtists = this.artistsRepository.create(newArtists);
    return this.artistsRepository.save(createdArtists);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<ArtistEntity> {
    await this.checkExistingArtist(id);
    return this.artistsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.checkExistingArtist(id);
    Object.assign(artist, updateArtistDto);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.checkExistingArtist(id);
    await this.artistsRepository.remove(artist);
  }

  private async checkExistingArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(ErrorMessages.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async checkExistingDependencyArtist(id: string): Promise<void> {
    if (id) {
      const entityInDb = await this.artistsRepository.findOneBy({ id });
      if (!entityInDb) {
        throw new UnprocessableEntityException(
          `Artist with id ${id} does not exist`,
        );
      }
    }
  }
}

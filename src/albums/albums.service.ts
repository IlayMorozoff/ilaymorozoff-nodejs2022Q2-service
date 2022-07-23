import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ErrorMessages } from 'src/common/errorsMgs';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    private readonly artistsService: ArtistsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    await this.artistsService.checkExistingDependencyArtist(
      createAlbumDto.artistId,
    );
    const newAlbum = new AlbumEntity();
    Object.assign(newAlbum, createAlbumDto);
    const createdAlbum = this.albumsRepository.create(newAlbum);
    return this.albumsRepository.save(createdAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    await this.checkExistingAlbum(id);
    return this.albumsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.checkExistingAlbum(id);
    Object.assign(album, updateAlbumDto);
    return this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const album = await this.checkExistingAlbum(id);
    await this.albumsRepository.remove(album);
  }

  private async checkExistingAlbum(id: string): Promise<AlbumEntity> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException(ErrorMessages.ALBUM_NOT_FOUND);
    }
    return album;
  }

  async checkExistingDependencyAlbum(id: string): Promise<void> {
    if (id) {
      const entityInDb = await this.albumsRepository.findOneBy({ id });
      if (!entityInDb) {
        throw new UnprocessableEntityException(
          `Album with id ${id} does not exist`,
        );
      }
    }
  }
}

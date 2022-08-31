import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllАFavorites() {
    const favorites = await this.favoritesService.findAll();
    return favorites;
  }

  @Post('artist/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  addArtistsToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistsFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }

  @Post('album/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('track/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }
}

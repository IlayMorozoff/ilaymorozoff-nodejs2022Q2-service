import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [InMemoryDbModule],
})
export class FavoritesModule {}

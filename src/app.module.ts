import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { InMemoryDbModule } from './in-memory-db/in-memory-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    InMemoryDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'albums',
})
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.album, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity; // refers to Artist

  @OneToMany(() => TrackEntity, (track) => track.album, {
    onDelete: 'SET NULL',
  })
  track: TrackEntity[]; // refers to Artist

  @ManyToOne(() => FavoritesEntity, (favorite) => favorite.tracks, {
    onDelete: 'CASCADE',
  })
  favorites: FavoritesEntity;
}

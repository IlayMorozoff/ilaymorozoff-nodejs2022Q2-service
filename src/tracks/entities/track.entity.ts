import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tracks',
})
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null; // refers to Album

  @Column({ type: 'int' })
  duration: number; // integer number

  @ManyToOne(() => ArtistEntity, (artist) => artist.track, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity[];

  @ManyToOne(() => AlbumEntity, (album) => album.track, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity[];
}

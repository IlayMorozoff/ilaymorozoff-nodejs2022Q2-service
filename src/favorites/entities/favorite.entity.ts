import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'favorites',
})
export class FavoritesEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', array: true, default: [] })
  artists: string[] = [];

  @Column({ type: 'varchar', array: true, default: [] })
  albums: string[] = [];

  @Column({ type: 'varchar', array: true, default: [] })
  tracks: string[] = [];
}

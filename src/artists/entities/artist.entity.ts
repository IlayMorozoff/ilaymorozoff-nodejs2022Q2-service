import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'artists',
})
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

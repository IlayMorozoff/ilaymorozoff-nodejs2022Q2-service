import { Entity } from 'typeorm';

@Entity({
  name: 'artists',
})
export class ArtistEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

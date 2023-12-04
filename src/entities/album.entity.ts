import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tracks_CRUD } from './tracks.entity';
import { Favorites_Crud } from './favorites.entity';

@Entity()
export class Album_Crud {
  @PrimaryGeneratedColumn({})
  @OneToMany(() => Tracks_CRUD, (track) => track.albumId)
  albumId: string | null;
  @Column({ nullable: true })
  name: string;
  @Column()
  year: number;
  @OneToMany(() => Tracks_CRUD, (track) => track.albumId)
  artistId: string | null;
  @OneToMany(() => Favorites_Crud, (favorite) => favorite.album)
  favoriteItems: Favorites_Crud[];
}

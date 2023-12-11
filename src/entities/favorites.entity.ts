import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist_Crud } from './artist.entity';
import { Album_Crud } from './album.entity';
import { Tracks_CRUD } from './tracks.entity';

@Entity()
export class Favorites_Crud {
  @PrimaryGeneratedColumn({})
  _id: string;
  @ManyToOne(() => Artist_Crud, (artist) => artist.favoriteItems)
  @JoinColumn()
  artist: Artist_Crud;

  @ManyToOne(() => Album_Crud, (album) => album.favoriteItems, {
    cascade: true,
  })
  @JoinColumn()
  album: Album_Crud;

  @ManyToOne(() => Tracks_CRUD, (track) => track.favoriteItems, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id' })
  track: Tracks_CRUD;
}

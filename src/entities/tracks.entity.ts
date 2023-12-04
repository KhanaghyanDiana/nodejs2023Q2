import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist_Crud } from './artist.entity';
import { Album_Crud } from './album.entity';
import { Favorites_Crud } from './favorites.entity';

@Entity()
export class Tracks_CRUD {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: true })
  name: string;
  @ManyToOne(() => Artist_Crud, (artist) => artist.artistId)
  @JoinColumn()
  artistId: Artist_Crud;
  @ManyToOne(() => Album_Crud, (album) => album.albumId)
  @JoinColumn()
  albumId: Album_Crud;
  @Column()
  duration: number;
  @OneToMany(() => Favorites_Crud, (favorite) => favorite.artist)
  favoriteItems: Favorites_Crud[];
}

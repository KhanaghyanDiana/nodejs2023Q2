import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tracks_CRUD } from './tracks.entity';
import { Favorites_Crud } from './favorites.entity';

@Entity()
export class Artist_Crud {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToMany(() => Tracks_CRUD, (track) => track.artistId)
  artistId: string | null;
  @Column({ nullable: true })
  name: string | null;
  @Column()
  grammy: boolean;
  @OneToMany(() => Favorites_Crud, (favorite) => favorite.artist, {
    cascade: true,
  })
  favoriteItems: Favorites_Crud[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Album_Crud } from '../../entities/album.entity';
import { Tracks_CRUD } from '../../entities/tracks.entity';
import { Artist_Crud } from '../../entities/artist.entity';
import { Favorites_Crud } from '../../entities/favorites.entity';
import { TracksService } from '../../Tracks/tracks.service';
import { AlbumService } from '../../Albums/album.service';
import { AlbumController } from '../../Albums/album.controller';
import { ArtistsService } from '../../Artists/artists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Album_Crud,
      Tracks_CRUD,
      Artist_Crud,
      Favorites_Crud,
    ]),
  ],
  providers: [FavoritesService, TracksService, AlbumService, ArtistsService],
  controllers: [FavoritesController, AlbumController],
})
export class FavoritesModule {}

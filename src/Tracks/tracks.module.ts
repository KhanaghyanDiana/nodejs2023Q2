import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks_CRUD } from '../entities/tracks.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { ArtistsService } from '../Artists/artists.service';
import { Artist_Crud } from '../entities/artist.entity';
import { Album_Crud } from '../entities/album.entity';
 import { AlbumService } from '../Albums/album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracks_CRUD, Artist_Crud, Album_Crud])],
  providers: [TracksService, ArtistsService, AlbumService],
  controllers: [TracksController],
})
export class TracksModule {}

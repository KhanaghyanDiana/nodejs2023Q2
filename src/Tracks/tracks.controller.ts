import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { TracksService } from './tracks.service';
import { ArtistsService } from "../Artists/artists.service";
import { AlbumService } from "../Albums/album.service";

@Controller('/track')
export class TracksController {
  constructor(
    private readonly tracks: TracksService,
    private readonly artists: ArtistsService,
    private readonly albums: AlbumService,
  ) {}

  @Post()
  async createNewPost(
    @Body('name') name: string,
    @Body('duration') duration: number,
    @Body('artistId') artistId: string,
    @Body('albumId') albumId: string,
  ) {
    console.log(albumId);
    const artists = await this.artists.getArtistByID(artistId);

    const albums = await this.albums.getAlbumByiD(albumId);
    return this.tracks.createTrack(name, duration, artists, albums);
  }
  @Get()
  getTracks() {
    return this.tracks.getTracks();
  }
  @Get(':id')
  fetchTrackById(@Param('id', new ParseIntPipe()) id: string) {
    return this.tracks.getTrackById(id);
  }
  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body('name') name: number | null,
    @Body('duration') duration: string | null,
  ) {
    return this.tracks.updateTrackInfo(id, duration, name);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.tracks.deleteTrackById(id);
  }
}

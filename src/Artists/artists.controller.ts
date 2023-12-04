import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artists: ArtistsService) {}

  @Post()
  createNewArtist(@Body('name') name: string, @Body('grammy') grammy: boolean) {
    return this.artists.createArtist(name, grammy);
  }
  @Get()
  getArtists() {
    return this.artists.getArtists();
  }
  @Get(':id')
  fetchTrackById(@Param('id') id: string) {
    return this.artists.getArtistByID(id);
  }
  @Put(':id')
  updatePassword(@Param('id') id: string, @Body('name') name: string | null) {
    return this.artists.updateArtistInfo(id, name);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.artists.deleteArtistById(id);
  }
}

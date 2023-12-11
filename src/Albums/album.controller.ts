import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('/album')
export class AlbumController {
  constructor(private readonly albums: AlbumService) {}

  @Post()
  createNewAlbum(@Body('name') name: string, @Body('year') year: number) {
    return this.albums.createAlbum(name, year);
  }
  @Get()
  getAlbums() {
    return this.albums.getAlbums();
  }
  @Get(':id')
  fetchAlbumById(@Param('id') id: string) {
    return this.albums.getAlbumByiD(id);
  }
  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body('name') name: string) {
    return this.albums.updateAlbum(id, name);
  }
  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.albums.deleteAlbumById(id);
  }
}

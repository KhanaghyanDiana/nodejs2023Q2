import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../../Tracks/tracks.service';
import { AlbumService } from "../../Albums/album.service";
import { ArtistsService } from "../../Artists/artists.service";

@Controller('/favs')
export class FavoritesController {
  constructor(
    private readonly favTracks: FavoritesService,
    private readonly tracks: TracksService,
    private readonly albums: AlbumService,
    private readonly artists: ArtistsService,
  ) {}

  @Post('/track/:id')
  async addTrackToTheFavorite(@Param('id') id: string) {
    const favoriteTrack = await this.tracks.getTrackById(id);
    return this.favTracks.addTrackToTheFavorite(favoriteTrack.data);
  }
  @Get()
  getFavTracks() {
    return this.favTracks.getFavTracksList();
  }
  @Delete('/track/:id')
  async deleteTrack(@Param('id') id: string) {
    console.log(id, 'ID');
    const favoriteTrack = await this.tracks.getTrackById(id);
    return this.favTracks.deleteFav(favoriteTrack.data);
  }
  // ALBUM
  @Post('/album/:id')
  async addAlbumToTheFavorite(@Param('id') id: string) {
    const favoriteAlbum = await this.albums.getAlbumByiD(id);
    return this.favTracks.addAlbumToFav(favoriteAlbum.data);
  }
  @Delete('/album/:id')
  async deleteAlbum(@Param('id') id: string) {
    console.log(id, 'ID');
    const favoriteTrack = await this.albums.getAlbumByiD(id);
    return this.favTracks.deleteFavAlbum(favoriteTrack.data);
  }
  // ARTIST
  @Post('/artist/:id')
  async addArtistToTheFavorite(@Param('id') id: string) {
    const favoriteArtist = await this.artists.getArtistByID(id);
    return this.favTracks.addArtistFav(favoriteArtist.data);
  }
  @Delete('/artist/:id')
  async deleteArtist(@Param('id') id: string) {
    const favoriteArtist = await this.artists.getArtistByID(id);
    return this.favTracks.deleteFavArtist(favoriteArtist.data);
  }
}

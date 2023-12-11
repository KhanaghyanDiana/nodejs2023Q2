import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites_Crud } from '../../entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites_Crud)
    private readonly favoriteEntity: Repository<Favorites_Crud>,
  ) {}
  async addTrackToTheFavorite(trackFav: any) {
    if (!trackFav) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        mes: 'Unprocessable Entity',
      };
    }
    const fullFavoriteList = await this.favoriteEntity.find({
      relations: ['track'],
    });
    const isExist = fullFavoriteList.findIndex(
      (item) => item.track?.id === trackFav.id,
    );
    if (isExist !== -1) {
      return {
        mes: 'Already Exists',
      };
    } else {
      const savedTrack = await this.favoriteEntity.save(trackFav);
      savedTrack.track = trackFav.id;
      if ('artistId' in savedTrack && 'albumId' in savedTrack) {
        delete savedTrack.albumId;
        delete savedTrack.artistId;
      }
    }
    const updatedFavTrack = await this.favoriteEntity.save(trackFav);
    if (trackFav) {
      return {
        data: {
          tracks: updatedFavTrack,
        },
        status: HttpStatus.CREATED,
      };
    }
  }
  async getFavTracksList() {
    const data = await this.favoriteEntity.find({
      relations: ['track', 'artist', 'album'],
    });
    return {
      track: data,
    };
  }
  async deleteFav(trackToBeDeleted: any) {
    const data = await this.favoriteEntity.find({
      relations: ['track'],
    });

    const foundItem = data.some((item) => {
      return item.track && item.track.id === trackToBeDeleted.id;
    });
    if (foundItem) {
      const index = data.findIndex(
        (item) => item?.track.id.toString() === trackToBeDeleted.id.toString(),
      );
      data[index].track.id = null;
      await this.favoriteEntity.save(data[index]);
    } else {
      return {
        mes: 'Item Has Already Deleted',
      };
    }
  }

  //  fav Album
  //  add to the favorite album
  async addAlbumToFav(albumFav: any) {
    // console.log(albumFav, "album");
    if (!albumFav) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        mes: 'Unprocessable Entity',
      };
    }
    const fullFavoriteList = await this.favoriteEntity.find({
      relations: ['album'],
    });
    console.log(fullFavoriteList);
    const isExist = fullFavoriteList.findIndex(
      (item) => item.album?.albumId === albumFav.albumId,
    );

    if (isExist !== -1) {
      return {
        mes: 'Already Exists',
      };
    } else {
      const albumFavorite = await this.favoriteEntity.save(albumFav);
      albumFavorite.album = albumFav.albumId;

      const updatedFavTrack = await this.favoriteEntity.save(albumFavorite);
      if (albumFav) {
        return {
          data: {
            album: updatedFavTrack,
          },
          status: HttpStatus.CREATED,
        };
      }
    }
  }
  // delete fav album
  async deleteFavAlbum(albumToBeDeleted: any) {
    const data = await this.favoriteEntity.find({
      relations: ['album'],
    });
    const foundItem = data.some((item) => {
      return item.album && item.album.albumId === albumToBeDeleted.albumId;
    });
    if (foundItem) {
      const index = data.findIndex(
        (item) =>
          item?.album?.albumId.toString() ===
          albumToBeDeleted.albumId.toString(),
      );
      data[index].album.albumId = null;
      await this.favoriteEntity.save(data[index]);
    } else {
      return {
        mes: 'Item Has Already Deleted',
      };
    }
  }
  // ADD ARTIST TO THE ALBUM
  async addArtistFav(artistFav: any) {
    // console.log(albumFav, "album");
    if (!artistFav) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        mes: 'Unprocessable Entity',
      };
    }
    const fullFavoriteList = await this.favoriteEntity.find({
      relations: ['artist'],
    });
    const isExist = fullFavoriteList.findIndex(
      (item) => item.artist?.id === artistFav.id,
    );
    if (isExist !== -1) {
      return {
        mes: 'Already Exists',
      };
    } else {
      const artistFavorite = await this.favoriteEntity.save(artistFav);
      console.log(artistFavorite, 'artist');
      artistFavorite.artist = artistFav.id;
      const updatedFavAlbum = await this.favoriteEntity.save(artistFavorite);
      if (artistFav) {
        return {
          data: {
            album: updatedFavAlbum,
          },
          status: HttpStatus.CREATED,
        };
      }
    }
  }
  async deleteFavArtist(artistToBeDeleted: any) {
    const data = await this.favoriteEntity.find({
      relations: ['album'],
    });
    const foundItem = data.some((item) => {
      return item.artist && item.artist?.id === artistToBeDeleted.id;
    });
    if (foundItem) {
      const index = data.findIndex(
        (item) =>
          item?.artist?.id.toString() === artistToBeDeleted.id.toString(),
      );
      data[index].artist.id = null;
      await this.favoriteEntity.save(data[index]);
    } else {
      return {
        mes: 'Item Has Already Deleted',
        status: HttpStatus.NO_CONTENT,
      };
    }
  }
}

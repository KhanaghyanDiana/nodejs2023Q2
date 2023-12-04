import { Artist } from '../../Artists/artists.types';
import { Album } from '../../Albums/album.types';
import { Track } from '../../Tracks/tracks.types';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

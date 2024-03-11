import { Album } from 'src/album/entities';
import { Artist } from 'src/artist/entities';
import { Track } from 'src/track/entites';

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type Entity = 'track' | 'album' | 'artist';
